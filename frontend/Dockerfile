FROM node:16-alpine AS dev
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

FROM dev AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]