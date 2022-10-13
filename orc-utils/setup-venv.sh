#!/usr/bin/env bash

python3 -m pip install --user virtualenv
python3 -m virtualenv ./orc-utils/_env
./orc-utils/_env/bin/python -m pip install -r ./orc-utils/requirements.txt
