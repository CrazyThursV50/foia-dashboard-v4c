# Federal FOIA Dashboard

A dashboard of the federal agencies' annual FOIA reports, FY2008–FY2025, made by a BU Spark! (DS 701) team for MuckRock.

This is version v4c: the start page has a column of five findings for all agencies, each opening a chart made for it.
The version without it is at https://github.com/CrazyThursV50/client-meeting-1117.

Live page: https://crazythursv50.github.io/foia-dashboard-v4c/

## Data

The numbers come from the annual FOIA reports on foia.gov, downloaded through the foia.gov API. The page only reads
`docs/data/foia.json`; the top bar shows the day that file was made.

To refresh it (needs a free api.data.gov key in `~/.foia_api_key`):

```bash
# 1. download every report (about 2 hours)
python pipeline/download_api_annual.py pipeline/report_data_map.json raw/api

# 2. build the component tables into data/new
python pipeline/build_component_tables_from_api.py raw/api pipeline/field_map.csv pipeline/report_data_map.json \
  data/FOIA_agency_FY2008-2025.csv data/component_master_no_03_06_11.csv data/data_type_map.csv data/new

# 3. check them with pipeline/check_component_tables.py (its arguments are at the top of the file),
#    copy data/new/*.csv into data/, then make the page's data file
python pipeline/prep.py --components data/component_master_no_03_06_11.csv --types data/data_type_map.csv \
  --mapping pipeline/column_mapping.csv --out docs/data
```

## Folders

- `docs/`: the page, served by GitHub Pages
- `pipeline/`: download, build, check and prep scripts
- `data/`: the component and agency tables
- `storylines/notebooks/`: analysis notebooks (HTML copies in `docs/notebooks/`)
- `tools/`: a local preview server and the page-code helper

## Editing the page

`docs/index.html` was rendered once with Quarto and is edited in place. Its code is kept inside the file:

```bash
python tools/page_code.py unpack cells   # cells/c01.js ... c38.js
python tools/page_code.py pack cells
```

Keep the number of cells the same, don't add a new top-level variable to a cell, and don't name a variable `cards`
(Quarto uses that name). The guide, year slider and links are in `docs/stories.js`.

Preview: `python tools/serve.py 8000 docs`, then open http://127.0.0.1:8000/.

## Notes

- Blank and N/A stay missing; they are not counted as zero.
- Government totals add up agency totals; components are not added on top of their agency.
- Days are working days, as in the reports.
