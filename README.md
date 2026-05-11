# dinosaur-opendata

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

An open data project that automatically fetches and visualizes reservation data for the Fukui Prefectural Dinosaur Museum, along with data on dinosaurs discovered in Fukui.

## Demo

-   **[Dinosaur Museum Dashboard](https://code4fukui.github.io/dinosaur-opendata/)**  
    An interactive chart showing the museum's reservation status for the next 60 days, including the number of visitors, total fees, and average price per visitor.

-   **[Dinosaurs Discovered in Fukui](https://code4fukui.github.io/dinosaur-opendata/dinosaur-fukui.html)**  
    A data table of dinosaurs discovered in Fukui Prefecture, Japan.

## Features

-   **Automated Daily Updates**: A GitHub Actions workflow runs daily at 03:31 JST (18:31 UTC) to fetch the latest reservation data.
-   **Interactive Dashboard**: The main page visualizes 60 days of reservation data using C3.js and D3.js.
-   **Data Archiving**: Creates both a `latest_dino_sum.csv` for current viewing and a daily archive (`data/YYYY-MM-DD.csv`).
-   **Resilient Display**: The dashboard automatically falls back to the previous day's data if the latest file contains no reservation information.
-   **Static Dinosaur Data**: Provides a clean, version-controlled CSV file (`dinosaur-fukui.csv`) of dinosaurs found in the region.
-   **Failure Notifications**: Sends a Slack notification if the automated data update fails.

## Datasets

### Museum Reservation Data

This data is updated daily.

-   **Latest Data**: [`latest_dino_sum.csv`](latest_dino_sum.csv)
-   **Archives**: [`data/`](data/)

**Columns:**
| Name | Description |
| :--- | :--- |
| `date_visit` | The date of the museum visit (YYYY-MM-DD). |
| `n_people` | The total number of reserved visitors for that date. |
| `amount_fee` | The total reservation fee in JPY. |

### Dinosaurs Discovered in Fukui

This is a static dataset.

-   **Data File**: [`dinosaur-fukui.csv`](dinosaur-fukui.csv)

**Columns:**
| Name | Description |
| :--- | :--- |
| `name` | Common name in Japanese. |
| `name_sci` | Scientific name. |
| `name_sci_ja` | Scientific name in Katakana. |
| `name_alt` | Alternative name (e.g., "フクイリュウ"). |
| `year_excavation` | Year of excavation. |
| `year_named` | Year the dinosaur was officially named. |
| `wikipedia` | Link to the Japanese Wikipedia page. |

## How It Works

1.  A scheduled GitHub Actions workflow ([`.github/workflows/scheduled-backup.yml`](.github/workflows/scheduled-backup.yml)) triggers daily.
2.  The workflow runs the Deno script [`update.js`](update.js).
3.  The script fetches the latest reservation data (in JSON format) from a source URL provided as a secret.
4.  It converts the JSON data to CSV and saves it as `latest_dino_sum.csv` and `data/YYYY-MM-DD.csv`.
5.  The workflow commits the new and updated data files back to the repository.

## Local Development

To run the update script manually, you need the Deno runtime.

```sh
# Install Deno: https://deno.land/manual/getting_started/installation

# Run the update script with the data source URL
deno run -A update.js [URL_TO_SUMMARY_DINO_JSON]
```

The data source URL is stored as a GitHub secret (`secrets.secret`) for the automated workflow.

## Data Source and Attribution

-   **Data Source**: [FPDM: Fukui Prefectural Dinosaur Museum](https://www.dinosaur.pref.fukui.jp/) (Cooperation: [Fukui Tourism Analysis System "FTAS"](https://www.fuku-e.com/feature/detail_266.html) by [Fukui Prefectural Tourism Federation](https://www.fuku-e.com/))
-   **Data Collection & App**: [Open Source on GitHub](https://github.com/code4fukui/dinosaur-opendata/) by [Code for FUKUI](https://code4fukui.github.io/)

## License

This project is available under the MIT License.