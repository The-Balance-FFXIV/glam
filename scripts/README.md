# Useful Scripts

## `generate_config.py`

This script generates the yaml file used by netlify; as of right now, it only generates a config for a dev environment (production should be added at a later time).

### Usage instructions

1. (Optional) Create a virtualenv with `python -mvenv env && . /env/bin/activate` on Linux/Mac
2. Install requirements: `pip install -r requirements.txt` 
3. Generate a config with `python generate_config.py > ../exampleSite/static/admin/dev.yml`
