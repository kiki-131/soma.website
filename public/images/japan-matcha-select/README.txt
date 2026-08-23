JAPAN MATCHA SELECT — 画像の出典と差し替え手順

現在配置している6点は Unsplash の写真をWebPに変換したもの。
Unsplash License（商用利用可・改変可・帰属表示不要）のため、そのまま公開して問題ない。
ただし「自社が扱う商品の写真」ではないため、本番の商材写真が用意でき次第の
差し替えを推奨する。

差し替え方法
  1. 同じファイル名（.webp）で上書きする
  2. app/japan-matcha-select/page.js の DIMENSIONS を実寸に更新する
     （ここがズレると読み込み時にレイアウトが飛ぶ）

────────────────────────────────────────
1. hero-matcha.webp        1067x1600
   内容: 茶碗の中の抹茶を茶筅で点てる手元
   出典: https://unsplash.com/photos/VhPtiipk0tE
   ※ 最終CTAセクションの背景にも使用（app/japan-matcha-select/jms.css の .final）

2. ceremonial-matcha.webp  900x1200
   内容: 和室で着物の亭主が茶を点てる様子
   出典: https://unsplash.com/photos/TmgR2If58HM

3. cafe-matcha.webp        800x1200
   内容: ラテアートを施した抹茶ラテ
   出典: https://unsplash.com/photos/rW_EmeV7dEU

4. culinary-matcha.webp    1200x686
   内容: 抹茶の焼き菓子と抹茶パウダー
   出典: https://unsplash.com/photos/2eylVMKAr1A

5. retail-matcha.webp      1200x857
   内容: 小売向けの抹茶パッケージ2点
   出典: https://unsplash.com/photos/5H4Y5D4HNBc

6. japanese-tea-field.webp 1600x1200
   内容: 富士山を望む茶畑（日本であることが一目で伝わる1枚を選定）
   出典: https://unsplash.com/photos/Oc5Fn2dS1tw
────────────────────────────────────────

選定時の判断
  ・他社ブランドのロゴ・商品名が写り込んでいる写真は、取扱商品と誤解される
    ため意図的に除外している（候補にあった缶入り商品の写真など）。
  ・茶畑はインド・スリランカの茶園写真が大量に出てくるが、日本産をうたう
    ページで使うと事実と食い違うため、富士山が写る日本の茶畑を選んだ。

自社撮影する場合の仕様
  sRGB / WebP / 1枚 150〜300KB 目安 / 自然光・作り込みすぎない上品な和のトーン
  hero-matcha はモバイルで 4:5、デスクトップでも縦長に使うため縦構図が望ましい。
