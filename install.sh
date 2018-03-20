#!/usr/bin/env bash

# download dependencies
npm install
# crawl and generate
npm run start
# copy to fortunes
sudo cp toxic /usr/share/games/fortunes/off
# create proxy files for ram access
sudo strfile /usr/share/games/fortunes/off/toxic /usr/share/games/fortunes/off/toxic.dat
# run
fortune off/toxic