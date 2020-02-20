#!/bin/bash

touch /Users/antoine/Desktop/running

osascript -e 'tell app "Terminal"
    activate
    do script "startjenkins"
end tell'
