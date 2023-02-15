# Usage
`workflow.yml` example
```yml
on: [release]

jobs:
  Upload Release:
    runs-on: ubuntu-latest
    name: Upload Release
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Upload to 
        uses: mchangrh/factorio-mod-upload@v1
        with:
          mod-name: 'evocontrol'
        env:
          FACTORIO_MODS_TOKEN: ${{ secrets.FACTORIO_TOKEN }}
          FILENAME: "./release.zip"
```
