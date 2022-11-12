# Hilger Grades 2022

### This project uses KeystoneJS on the backend and React on the frontend. More information coming soon but here are some tips/tricks on getting started with this project.  

- The KeystoneJS UI is disabled in production so be sure to set NODE_ENV=DEVELOPMENT
- In development requests to the API are proxied so whatever you set the PORT variable to in the main .env file, be sure to also update the entry in `frontend/package.json` so that requests are properly proxied.  Also be sure that this port is correctly exposed in the docker-compose.yml file.


## Stuff that is broken
- When clicking the impersonate parent button from the dashboard, the user in production will be taken to /parents/hashOfParentId however I don't really know the best way to set this up in the dev environment what with hot reloading and all so for now you will need to replace localhost:4000/parents/* with localhost:8081/parents/*

- .env file is not being copied into the frontend-php(proxy) container and needs to be done manually for now
- composer dependencies are not properly being installed in the frontend-php(proxy) container although there is a line in the docker file.  Need to look into this as well.  I suspect we maybe need to copy them into the image.
- Currently if a parent navigates to the link to view grades for their students, there is no way for them to know whether grades have been entered yet or not because we are simply fetching students form the db and displaying them.  We need some way to check whether the student has any grades yet and if not we need to display some sort of information to the parent.