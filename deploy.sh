#!/bin/bash

cd ~/hilger_keystone
git checkout master
git fetch && git pull
cd backend 
yarn
yarn build
pm2 restart api