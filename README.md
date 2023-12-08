# フルスタックアプリ（フロント側）

フルスタックなメモアプリを実装しました。フロントから CRUD 操作をして、メモを DB に保存できます。

# 行ったこと

## 要件

- React（フロントのフレームワーク）
- Node.js（フレームワークは Express）
- mongoose（DB の Query Builder）
- MongoDB（NoAQL の DB）

## フロントエンド

- UI デザイン
- 読み込み
  - 左側にはノートカードのリスト
  - 右側には現在選択されているノートのテキスト
  - ノートカードの最終更新日時でソート
  - ノートカードはノートのタイトルと最終更新日時を表示
  - ノートのタイトルは、ノートカードの最初の行に表示(長すぎる場合は、最初の数文字のみを抜き出し)
  - ノートカードをクリックすると、選択したノートカードを強調
- 作成
  - ＋ボタンで、左側に空白のノートカードが作成され、右側に空白のノート作業スペースが作成
- 削除
  - ✕ ボタンで、ノートカードのリストからノートを削除
  - ノート削除後、ノート作業スペースの表示は次に利用可能なノートが選択
- 更新

  - テキストを書き込める
  - 最初の行を更新した場合、左側のノートカードのタイトルも更新
  - キーボードに動きがない場合は 5 秒ごとに、もしくは別のノートに切り替えた時に保存（"Saved" というテキストを表示）

- 応用
  - テストを実装（フレームワーク：jest）
  - 検索バーに入力された文字列でノートを検索（ヒットしたノートカードのみを左側に表示）

## サーバサイド

- RESTful API
- 以下の CRUD 操作のエンドポイントを作成
  - ノートの読み込み
  - ノートの作成
  - ノートの更新
  - ノートの削除
- テストを実装（フレームワーク：mocha）

- 応用
- バリデーション（形式、最大文字数、左右の余白削除）

- DB より検索

## データベース

- NoSQL を使用
- データベースの seed ファイルを作成
- サーバと接続
- `package.json` に `seed` スクリプトを作成

## デプロイ

- Heroku にアプリをデプロイ
- DEPLOY.md にリンク記入（フロントとバックで分割

## その他

- アプリの初期設定から起動までをコマンドで実行できるように `package.json` に適切な `scripts` を設定
- Git を使用してソース管理

# 初期設定から起動までのコマンド

フロント、バックそれぞれで、以下を実行ください
`npm run setup-and-start`

# 著書

- 作成者：野村
- 所属：デジタル変革推進室
- E-mail：koki_nomura@mail.toyota.co.jp
