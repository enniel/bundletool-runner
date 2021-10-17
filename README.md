# GitHub Action - BundleTool Runner

This runner install [Google BundleTool](https://developer.android.com/studio/command-line/bundletool)

## Usage

```
jobs:
  test:
    runs-on: macos-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: install bundletool
        uses: enniel/bundletool-runner@v1
```
