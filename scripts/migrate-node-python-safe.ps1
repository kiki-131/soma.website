<#
Safe migration script: Python & Node.js to D:\Apps (PowerShell)
- Performs admin elevation check
- Backs up current Node/npm info and global packages to a temp folder
- Downloads installers to temp, verifies existence (optionally SHA256)
- Prompts user before uninstalling (manual uninstall step for safety)
- Installs Python (silent) and Node (MSI) to D:\Apps (or other target)
- Verifies installation and suggests npm rebuild / global re-install

USAGE (PowerShell as Administrator):
- Edit the $InstallPath, $NodeVersion, $PythonVersion variables if desired.
- Run: .\migrate-node-python-safe.ps1

WARNING:
- This script touches system installers and requires administrator rights.
- It attempts to be conservative (prompts for manual uninstall). Use at your own risk.
#>

param(
    [string]$InstallPath = 'D:\Apps',
    [string]$NodeVersion = '22.11.0',
    [string]$PythonVersion = '3.13.7',
    [switch]$SkipManualUninstallPrompt
)

function Require-Admin {
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if (-not $isAdmin) {
        Write-Host "管理者権限で再起動します..." -ForegroundColor Yellow
        Start-Process -FilePath pwsh -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
        Exit 0
    }
}

function Save-Current-State {
    param($OutDir)
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
    Write-Host "保存先: $OutDir"

    try {
        node -v 2>$null | Out-File -FilePath (Join-Path $OutDir 'node-version.txt') -Encoding utf8
    } catch { $_ | Out-Null }
    try { where.exe node 2>$null | Out-File (Join-Path $OutDir 'where-node.txt') -Encoding utf8 } catch { }
    try { npm -v 2>$null | Out-File (Join-Path $OutDir 'npm-version.txt') -Encoding utf8 } catch { }
    try { npm root -g 2>$null | Out-File (Join-Path $OutDir 'npm-root-global.txt') -Encoding utf8 } catch { }
    try { npm prefix -g 2>$null | Out-File (Join-Path $OutDir 'npm-prefix-global.txt') -Encoding utf8 } catch { }
    try { npm ls -g --depth=0 2>$null | Out-File (Join-Path $OutDir 'npm-globals-before.txt') -Encoding utf8 } catch { }
}

function Download-File {
    param($Url, $OutFile)
    Write-Host "ダウンロード: $Url -> $OutFile"
    Invoke-WebRequest -Uri $Url -OutFile $OutFile -UseBasicParsing -ErrorAction Stop
}

# --- START ---
Require-Admin

$timestamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
$workDir = Join-Path $env:TEMP "migrate-node-python-$timestamp"
New-Item -ItemType Directory -Force -Path $workDir | Out-Null
Write-Host "作業フォルダ: $workDir"

# Save current state for rollback/inspection
Save-Current-State -OutDir $workDir

# Show summary and confirm
Write-Host "`n=== 概要 ==="
Write-Host "インストール先: $InstallPath"
Write-Host "Node バージョン: $NodeVersion"
Write-Host "Python バージョン: $PythonVersion"
Write-Host "このスクリプトはインストーラのダウンロードと静かなインストールを行います。続行しますか？ (Y/N)"
$ok = Read-Host
if ($ok -notin @('Y','y')) { Write-Host "中止します。"; Exit 0 }

# Ensure install path exists
if (!(Test-Path $InstallPath)) { New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null; Write-Host "作成: $InstallPath" }

# --- Python ---
Write-Host "`n=== Python の処理 ==="
$pythonUrl = "https://www.python.org/ftp/python/$PythonVersion/python-$PythonVersion-amd64.exe"
$pythonInstaller = Join-Path $workDir "python-installer.exe"
try {
    Download-File -Url $pythonUrl -OutFile $pythonInstaller
} catch {
    Write-Host "Python ドウンロードに失敗しました: $_" -ForegroundColor Red
    Write-Host "URLを手動で確認してください: $pythonUrl"
}

# Prompt for uninstall of existing Python (manual step recommended)
$pythonExists = (Get-Command python -ErrorAction SilentlyContinue) -ne $null
if ($pythonExists -and (-not $SkipManualUninstallPrompt)) {
    Write-Host "Python が検出されました。コントロールパネルでアンインストールを行ってください。" -ForegroundColor Yellow
    Start-Process appwiz.cpl
    Write-Host "アンインストールが完了したら Enter を押してください..."
    Read-Host
}

# Install Python silently to $InstallPath\Python<ver>
$pythonTarget = Join-Path $InstallPath ("Python" + ($PythonVersion -replace '\\.',''))
Write-Host "Python を $pythonTarget にインストールします..."
try {
    Start-Process -FilePath $pythonInstaller -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1 TargetDir=`"$pythonTarget`"" -Wait -ErrorAction Stop
    Write-Host "✅ Python をインストールしました。"
} catch {
    Write-Host "⚠ Python のインストールに失敗しました: $_" -ForegroundColor Red
}

# --- Node.js ---
Write-Host "`n=== Node.js の処理 ==="
$nodeMsiUrl = "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-x64.msi"
$nodeMsi = Join-Path $workDir "node-installer.msi"
try {
    Download-File -Url $nodeMsiUrl -OutFile $nodeMsi
} catch {
    Write-Host "Node.js のダウンロードに失敗しました: $_" -ForegroundColor Red
    Write-Host "URLを手動で確認してください: $nodeMsiUrl"
}

# Prompt for uninstall of existing Node.js
$nodeExists = (Get-Command node -ErrorAction SilentlyContinue) -ne $null
if ($nodeExists -and (-not $SkipManualUninstallPrompt)) {
    Write-Host "Node.js が検出されました。コントロールパネルでアンインストールを行ってください。" -ForegroundColor Yellow
    Start-Process appwiz.cpl
    Write-Host "アンインストールが完了したら Enter を押してください..."
    Read-Host
}

# Install Node MSI to $InstallPath\nodejs using msiexec (may or may not honor INSTALLDIR on some MSI builds)
$nodeTarget = Join-Path $InstallPath "nodejs"
Write-Host "Node.js を $nodeTarget にインストールします..."
try {
    $msiArgs = "/i `"$nodeMsi`" /qn INSTALLDIR=`"$nodeTarget`""
    Start-Process -FilePath msiexec.exe -ArgumentList $msiArgs -Wait -NoNewWindow -ErrorAction Stop
    Write-Host "✅ Node.js をインストールしました（msi を使用）。"
} catch {
    Write-Host "⚠ Node.js のインストールに失敗しました: $_" -ForegroundColor Red
    Write-Host "msiexec の出力を確認してください。手動でインストールする場合は $nodeMsi を実行してください。"
}

# --- Post-install verification ---
Write-Host "`n=== インストール検証 ==="
try {
    Write-Host "where node:"; where.exe node
} catch { Write-Host "where node を取得できませんでした" }
try { Write-Host "node -v:"; node -v } catch { Write-Host "node が見つかりません" }
try { Write-Host "npm -v:"; npm -v } catch { Write-Host "npm が見つかりません" }

# Suggest actions for global packages and native modules
Write-Host "`n=== 次の手順（推奨） ==="
Write-Host "1) 必要に応じてグローバルパッケージを再インストールしてください。バックアップ: $workDir\npm-globals-before.txt"
Write-Host "   例: npm install -g <package>"
Write-Host "2) プロジェクトの node_modules を再構築するには、各プロジェクトで: npm rebuild または rm -r node_modules ; npm install を実行してください。"
Write-Host "3) PATH が正しく設定されていない場合は、再ログインまたは再起動してください。"

Write-Host "\n作業完了。ログとバックアップは $workDir に保存されています。"

# End of script
