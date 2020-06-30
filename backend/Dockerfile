FROM node:12
LABEL maintainer="nitin.i.joy@gmail.com"

RUN mkdir /home/work
ADD ./backend /home/work
WORKDIR /home/work
RUN npm install
RUN npx tsc

EXPOSE 3030/tcp
CMD node dist/app.js