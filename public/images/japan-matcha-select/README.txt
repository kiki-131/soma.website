JAPAN MATCHA SELECT — 画像差し替え手順

現在この階層に入っているのは仮のSVGプレースホルダー（抹茶色のグラデーション）です。
本番公開前に、下記の仕様で撮影・調達したWebP画像に差し替えてください。

差し替え方法
  1. 下記のファイル名で .webp を本ディレクトリに置く
  2. app/japan-matcha-select/page.js 冒頭の  const IMG_EXT = "svg";  を  "webp"  に変更
  3. app/japan-matcha-select/jms.css の .final の背景URLの拡張子も .webp に変更

共通仕様: sRGB / WebP / 1枚あたり 150〜300KB 目安 / 自然光・作り込みすぎない上品な和のトーン

1. hero-matcha.webp        1600x1200以上 / 4:3（モバイルで4:5に切っても成立する構図）
   抹茶碗・茶筅・抹茶粉。自然光、最小限のスタイリング
   alt: Ceremonial matcha in a Japanese tea bowl with a bamboo whisk

2. ceremonial-matcha.webp  1200x900以上 / 4:3〜16:10
   セレモニアルグレードの抹茶と伝統的な点前
   alt: Premium ceremonial-grade Japanese matcha

3. cafe-matcha.webp        1200x900以上 / 4:3〜16:10
   現代的なカフェでの抹茶ラテ
   alt: Japanese matcha prepared for café lattes

4. culinary-matcha.webp    1200x900以上 / 4:3〜16:10
   製菓・ベーカリー文脈での抹茶パウダー
   alt: Culinary Japanese matcha powder for baking and desserts

5. retail-matcha.webp      1200x900以上 / 4:3〜16:10
   小売棚に並ぶ消費者向けパッケージ
   alt: Consumer-ready Japanese matcha products for retail

6. japanese-tea-field.webp 1600x1200以上 / 4:3
   日本の茶畑。柔らかい自然光、余計なものが写らない構図
   alt: Green tea fields in Japan where matcha leaves are cultivated
