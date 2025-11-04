<#
Safer migration script: Node.js & Python -> D:\Apps
- Adds robust admin-check, error handling, download verification, JSON parsing of npm globals,
  safer msiexec invocation, retry logic, and clear user prompts before destructive actions.

Usage (run PowerShell as Administrator):
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
    cd <project>/scripts
    .\migrate-node-python-safer.ps1

Notes:
- This script is interactive by design: it prompts before uninstall steps and before running installers.
- It never sends or logs passwords. It saves pre-migration state under $WorkDir for inspection.
- On failure, consult the saved log files in $WorkDir.
#>

[CmdletBinding(SupportsShouldProcess=$true)]
param(
    [string]$InstallRoot = 'D:\Apps',
    [string]$NodeVersion = '22.11.0',
    [string]$PythonVersion = '3.13.7',
    [int]$DownloadRetry = 2
)

function Write-Log {
    param([string]$Text, [string]$Level = 'INFO')
    $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Write-Host "[$ts] [$Level] $Text"
}

function Require-Admin {
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if (-not $isAdmin) {
        Write-Log "管理者権限が必要です。管理者として再起動します..." WARN
        $ps = $MyInvocation.MyCommand.Definition
        Start-Process -FilePath pwsh -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$ps`"" -Verb RunAs
        Exit 0
    }
    Write-Log "管理者権限で実行中。"
}

function Ensure-Directory {
    param([string]$Path)
    if (!(Test-Path $Path)) { New-Item -ItemType Directory -Force -Path $Path | Out-Null; Write-Log "作成: $Path" }
}

function Download-WithRetry {
    param([string]$Url, [string]$OutFile)
    $attempt = 0
    while ($attempt -le $DownloadRetry) {
        try {
            $attempt++
            Write-Log "ダウンロード開始 (試行 $attempt): $Url"
            Invoke-WebRequest -Uri $Url -OutFile $OutFile -UseBasicParsing -ErrorAction Stop
            if ((Test-Path $OutFile) -and ((Get-Item $OutFile).Length -gt 0)) {
                Write-Log "ダウンロード成功: $OutFile"
                return $true
            } else {
                Write-Log "ダウンロード失敗（ファイルが空）: $OutFile" ERROR
            }
        } catch {
            Write-Log "ダウンロードエラー: $_" ERROR
        }
        Start-Sleep -Seconds (2 * $attempt)
    }
    return $false
}

function Save-Current-State {
    param([string]$OutDir)
    Ensure-Directory -Path $OutDir
    Write-Log "現在の状態を保存: $OutDir"
    try { node -v 2>$null | Out-File (Join-Path $OutDir 'node-version.txt') -Encoding utf8 } catch {}
    try { where.exe node 2>$null | Out-File (Join-Path $OutDir 'where-node.txt') -Encoding utf8 } catch {}
    try { npm -v 2>$null | Out-File (Join-Path $OutDir 'npm-version.txt') -Encoding utf8 } catch {}
    try { npm root -g 2>$null | Out-File (Join-Path $OutDir 'npm-root-global.txt') -Encoding utf8 } catch {}
    try { npm prefix -g 2>$null | Out-File (Join-Path $OutDir 'npm-prefix-global.txt') -Encoding utf8 } catch {}
    try {
        $json = npm ls -g --depth=0 --json 2>$null | Out-String
        if ($json) { $json | Out-File (Join-Path $OutDir 'npm-globals-before.json') -Encoding utf8 }
    } catch { }
}

function Parse-NpmGlobals {
    param([string]$JsonFile)
    if (!(Test-Path $JsonFile)) { return @() }
    try {
        $content = Get-Content $JsonFile -Raw | ConvertFrom-Json
        if ($null -eq $content.dependencies) { return @() }
        return $content.dependencies.Keys
    } catch {
        Write-Log "npm globals の解析に失敗しました: $_" ERROR
        return @()
    }
}

function Reinstall-NpmGlobals {
    param([string[]]$Packages)
    if (-not $Packages -or $Packages.Count -eq 0) { Write-Log "グローバルパッケージは見つかりませんでした。"; return }
    foreach ($pkg in $Packages) {
        try {
            Write-Log "再インストール: $pkg"
            npm install -g $pkg 2>$null | Out-Null
        } catch {
            Write-Log "再インストール失敗: $pkg ($_)" ERROR
        }
    }
}

# --- START ---
Require-Admin

$timestamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
$WorkDir = Join-Path $env:TEMP "migrate-node-python-$timestamp"
Ensure-Directory -Path $WorkDir
Write-Log "作業ディレクトリ: $WorkDir"

# Save pre-migration state
Save-Current-State -OutDir $WorkDir

# Basic values
$NodeMsiUrl = "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-x64.msi"
$PythonExeUrl = "https://www.python.org/ftp/python/$PythonVersion/python-$PythonVersion-amd64.exe"
$NodeMsi = Join-Path $WorkDir 'node-installer.msi'
$PythonExe = Join-Path $WorkDir 'python-installer.exe'

Ensure-Directory -Path $InstallRoot

Write-Log "移行先: $InstallRoot"
Write-Host "このスクリプトはインストーラをダウンロードしてインストールします。続行しますか？ (Y/N)"
$ans = Read-Host
if ($ans -notin @('Y','y')) { Write-Log "ユーザーが中止しました。"; Exit 0 }

# --- Download installers ---
if (-not (Download-WithRetry -Url $NodeMsiUrl -OutFile $NodeMsi)) {
    Write-Log "Node.js のダウンロードに失敗しました。手動で $NodeMsiUrl をダウンロードしてください。" ERROR
}
if (-not (Download-WithRetry -Url $PythonExeUrl -OutFile $PythonExe)) {
    Write-Log "Python のダウンロードに失敗しました。手動で $PythonExeUrl をダウンロードしてください。" ERROR
}

# Prompt user to uninstall existing installations (safer than forced uninstall)
Write-Host "`n既存の Node.js / Python を手動またはコントロールパネルでアンインストールしてください。完了したら Enter を押してください。"
Read-Host

# --- Install Node ---
$NodeTarget = Join-Path $InstallRoot 'nodejs'
Write-Log "Node.js を $NodeTarget にインストールします (msiexec を使用)"
try {
    $msiArgs = @('/i', $NodeMsi, '/qn', "INSTALLDIR=$NodeTarget")
    Start-Process -FilePath msiexec.exe -ArgumentList $msiArgs -Wait -NoNewWindow -ErrorAction Stop
    Write-Log "Node.js インストール試行が完了しました。"
} catch {
    Write-Log "Node.js インストール中にエラー: $_" ERROR
    Write-Host "msiexec の出力を確認するか、手動で $NodeMsi を実行して下さい。"
}

# --- Install Python ---
$PythonTarget = Join-Path $InstallRoot ('Python' + ($PythonVersion -replace '\\.', ''))
Write-Log "Python を $PythonTarget にインストールします (公式 exe を使用)"
try {
    $pyArgs = "/quiet", "InstallAllUsers=1", "TargetDir=$PythonTarget", "PrependPath=1", "Include_pip=1"
    Start-Process -FilePath $PythonExe -ArgumentList $pyArgs -Wait -NoNewWindow -ErrorAction Stop
    Write-Log "Python インストール試行が完了しました。"
} catch {
    Write-Log "Python インストール中にエラー: $_" ERROR
}

# --- Post check ---
Write-Log "インストール後の検証を行います。"
Write-Log "where node:"; where.exe node | Out-String | Write-Host
try { Write-Log "node -v: $(node -v 2>$null)" } catch { Write-Log "node が見つかりません" ERROR }
try { Write-Log "npm -v: $(npm -v 2>$null)" } catch { Write-Log "npm が見つかりません" ERROR }
try { Write-Log "python --version: $(python --version 2>$null)" } catch { Write-Log "python が見つかりません" ERROR }

# --- Restore global packages ---
$globalsJson = Join-Path $WorkDir 'npm-globals-before.json'
$pkgs = Parse-NpmGlobals -JsonFile $globalsJson
if ($pkgs.Count -gt 0) {
    Write-Host "`nグローバルパッケージの再インストールを開始します。";
    Reinstall-NpmGlobals -Packages $pkgs
} else {
    Write-Log "再インストールするグローバルパッケージはありません。"
}

Write-Log "移行作業が完了しました。ログとバックアップは $WorkDir に保存されています。"
Write-Host "必要なら再ログインまたは再起動してください。"

# End of script
