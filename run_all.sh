#!/bin/sh

# turn on bash's job control
set -m

# Start the primary process and put it in the background
cd /home/api/
python3 api.py &

# Start the second process
cd /home/webapp/
ng serve --host 0.0.0.0 --disableHostCheck