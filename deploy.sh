#!/bin/bash

# cd ~/hilger_keystone
# git checkout master
# git fetch && git pull
# cd backend 
# yarn
# yarn build
# pm2 restart api
cd frontend
yarn && yarn build
cd ../backend
yarn && yarn build
cd ..
# This will copy all of the contents of the backend folder into the mono-repo-staging folder which will create the backend folder if it doesn't exist.
rsync -avzh --progress --exclude=.env ./backend portal:/home/murph/mono-repo-staging

# This will copy the contents of the frontend/build folder into our frontend folder in staging.
rsync -avzh --progress --exclude=.env ./frontend/build/ portal:/home/murph/mono-repo-staging/frontend
rsync -avzh --progress --exclude=.env ./frontend-php/ portal:/home/murph/mono-repo-staging/frontend

ssh portal /home/murph/.npm-packages/bin//pm2 reload 2