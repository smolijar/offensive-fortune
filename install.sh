#!/usr/bin/env bash

# download dependencies
npm install
# crawl and generate
npm run start
# copy to fortunes
sudo cp off-fortune /usr/share/games/fortunes/off
# create proxy files for ram access
sudo strfile /usr/share/games/fortunes/off/off-fortune /usr/share/games/fortunes/off/off-fortune.dat
# run
fortune /usr/share/games/fortunes/off/off-fortune