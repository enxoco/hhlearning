#!/bin/bash

cd ~/hilger_keystone
git checkout master
git fetch && git pull
yarn build
pm2 restart api