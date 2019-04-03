FROM node:11.12.0-stretch

WORKDIR /usr/src/server_template

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]