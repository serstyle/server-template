FROM node:11.12.0-stretch

WORKDIR /usr/src/best4cast-server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]