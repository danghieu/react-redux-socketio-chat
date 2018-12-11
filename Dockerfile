# base image
FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install -g create-react-app
RUN npm install react-scripts -g --silent

RUN npm install -g react-devtools --unsafe-perm=true --allow-root
RUN npm install --save-dev @babel/core @babel/preset-env

# start app
CMD ["bash"]