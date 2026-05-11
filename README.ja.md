# dinosaur-opendata

福井県立恐竜博物館の予約データと、福井県で発見された恐竜に関するデータを自動的に取得し、可視化するオープンデータプロジェクトです。

## デモ

-   **[恐竜博物館ダッシュボード](https://code4fukui.github.io/dinosaur-opendata/)**  
    博物館の向こう60日間の予約状況（来場者数、合計料金、1人あたりの平均料金）を示すインタラクティブなチャートです。

-   **[福井県で発見された恐竜](https://code4fukui.github.io/dinosaur-opendata/dinosaur-fukui.html)**  
    福井県で発見された恐竜のデータテーブルです。

## 主な機能

-   **毎日の自動更新**: GitHub Actionsのワークフローが毎日03:31 JST（18:31 UTC）に実行され、最新の予約データを取得します。
-   **インタラクティブなダッシュボード**: メインページでは、C3.jsとD3.jsを使用して60日分の予約データを可視化します。
-   **データアーカイブ**: 現在の表示用に `latest_dino_sum.csv` を作成するほか、日次アーカイブ（`data/YYYY-MM-DD.csv`）も保存します。
-   **表示のフォールバック**: 最新のファイルに予約情報が含まれていない場合、ダッシュボードは自動的に前日のデータを表示します。
-   **静的な恐竜データ**: 同地域で発見された恐竜のクリーンでバージョン管理されたCSVファイル（`dinosaur-fukui.csv`）を提供します。
-   **エラー通知**: 自動データ更新に失敗した場合、Slackに通知を送信します。

## データセット

### 博物館予約データ

このデータは毎日更新されます。

-   **最新データ**: [`latest_dino_sum.csv`](latest_dino_sum.csv)
-   **アーカイブ**: [`data/`](data/)

**列:**
| 名前 | 説明 |
| :--- | :--- |
| `date_visit` | 博物館の訪問日（YYYY-MM-DD）。 |
| `n_people` | その日の予約来場者数の合計。 |
| `amount_fee` | 合計予約料金（円）。 |

### 福井県で発見された恐竜

これは静的なデータセットです。

-   **データファイル**: [`dinosaur-fukui.csv`](dinosaur-fukui.csv)

**列:**
| 名前 | 説明 |
| :--- | :--- |
| `name` | 日本語の一般的な名称。 |
| `name_sci` | 学名。 |
| `name_sci_ja` | カタカナ表記の学名。 |
| `name_alt` | 別名（例: "フクイリュウ"）。 |
| `year_excavation` | 発掘年。 |
| `year_named` | 恐竜が正式に命名された年。 |
| `wikipedia` | 日本語版Wikipediaページへのリンク。 |

## 仕組み

1.  スケジュールされたGitHub Actionsワークフロー（[`.github/workflows/scheduled-backup.yml`](.github/workflows/scheduled-backup.yml)）が毎日実行されます。
2.  ワークフローはDenoスクリプト [`update.js`](update.js) を実行します。
3.  スクリプトは、シークレットとして提供されたソースURLから最新の予約データ（JSON形式）を取得します。
4.  JSONデータをCSVに変換し、`latest_dino_sum.csv` および `data/YYYY-MM-DD.csv` として保存します。
5.  ワークフローは、新規および更新されたデータファイルをリポジトリにコミットします。

## ローカルでの開発

更新スクリプトを手動で実行するには、Denoランタイムが必要です。

```sh
# Denoのインストール: https://deno.land/manual/getting_started/installation

# データソースURLを指定して更新スクリプトを実行
deno run -A update.js [URL_TO_SUMMARY_DINO_JSON]
```

データソースURLは、自動化ワークフロー用のGitHubシークレット（`secrets.secret`）として保存されています。

## データソースとクレジット

-   **データソース**: [FPDM: 福井県立恐竜博物館](https://www.dinosaur.pref.fukui.jp/) （協力: [福井県観光連盟](https://www.fuku-e.com/)による[福井県観光分析システム「FTAS」](https://www.fuku-e.com/feature/detail_266.html)）
-   **データ収集およびアプリ開発**: [Code for FUKUI](https://code4fukui.github.io/) による [GitHub上のオープンソース](https://github.com/code4fukui/dinosaur-opendata/)

## ライセンス

このプロジェクトは MIT License の下で利用可能です。
