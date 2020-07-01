FROM node:12
LABEL maintainer="nitin.i.joy@gmail.com"

ADD ./frontend /home/work
WORKDIR /home/work
RUN ls .
RUN npm install
RUN npm run build