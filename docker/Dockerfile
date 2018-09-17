FROM selenium/node-chrome

USER root

RUN apt-get update
RUN apt-get install -y curl apt-transport-https ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs build-essential
RUN apt-get install -y fonts-ipafont-mincho
RUN npm i -g lighthouse

VOLUME ["/app"]
WORKDIR /app
