FROM node:11.12.0-stretch

WORKDIR /usr/src/server_template 
# name need to be change

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]