# Hilger Grades 2022

### This project uses KeystoneJS on the backend and React on the frontend. More information coming soon but here are some tips/tricks on getting started with this project.  

- The KeystoneJS UI is disabled in production so be sure to set NODE_ENV=DEVELOPMENT
- In development requests to the API are proxied so whatever you set the PORT variable to in the main .env file, be sure to also update the entry in `frontend/package.json` so that requests are properly proxied.  Also be sure that this port is correctly exposed in the docker-compose.yml file.