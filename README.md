# Usage
- Pass through `mod-name` as a value  
- Pass through `FACTORIO_TOKEN` as a secret
  - this requires a "ModPortal: Upload Mods" key - see https://factorio.com/create-api-key

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
      - name: Upload to Mod Portal
        uses: mchangrh/factorio-mod-upload@v1
        with:
          mod-name: 'mycoolmod'
        env:
          FACTORIO_MODS_TOKEN: ${{ secrets.FACTORIO_TOKEN }}
          FILENAME: "./coolmod_v1.0.0.zip"
```

A full example can be found at [mchangrh/evocontrol](https://github.com/mchangrh/factorio-evocontrol-mod/blob/main/.github/workflows/release.yml)

`FACTORIO_MOD_NAME` is set as a repository variable to be agnostic for forking :)