# econfgen

econfgen is a tool to generate the configuration files needed by this theme.

## Development

**Prerequisites**

Install [rye](https://rye.astral.sh/) and follow the documentation for the most part for adding/removing/syncing packages. To run econfgen, run `rye run econfgen`.

## Installation

Set up a python environment (3.12 or better) and run `pip install /path/to/econfgen`

## Usage

Usage is provided as part of the `-h` or `--help` flag:

```
usage: econfgen [-h] [-P] [-c CONFIG]

Tool to generate netlify configurations compatible with the theme

options:
  -h, --help            show this help message and exit
  -P, --prod            If a production or local configuration should be generated
  -c CONFIG, --config CONFIG
                        Path to the configuration file
```

## Configuration

There is an example `econfgen.yml.example` file; cop that to `econfgen.yml` in the current directory or point to it with the `-c` flag of `econfgen`; this generates a configuration file for netflify to use.
