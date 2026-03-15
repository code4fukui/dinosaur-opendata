# dinosaur-opendata

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A project that provides open data on dinosaur-related information from the Fukui Prefectural Dinosaur Museum in Japan.

## Features
- Automatically fetches and updates the latest reservation data for the Fukui Prefectural Dinosaur Museum
- Generates CSV files with the reservation data on a daily basis
- Provides an HTML dashboard to visualize the reservation trends

## Data / API
The project utilizes the reservation data provided by the Fukui Prefectural Dinosaur Museum. The data is fetched from an undisclosed URL and stored as CSV files in the `data/` directory.

## Usage
To update the data, run the following command:

```sh
deno run -A update.js [url to get summary_dino.json]
```

This will fetch the latest data from the specified URL and update the CSV files in the `data/` directory.

## License
This project is licensed under the MIT License.