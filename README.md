# GitHub Action - BundleTool Runner

## Usage

```
jobs:
  test:
    runs-on: macos-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: install bundletool
        uses: enniel/bundletool@v1
```
