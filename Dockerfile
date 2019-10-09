# FROM node:12.11.1
FROM ubuntu:18.04

ENV WEBAPP_WORKDIR /home/webapp
ENV API_WORKDIR /home/api

# Install Node.js
RUN apt-get update && \
    apt-get install -y \
    curl \
    python3 \
    python3-pip \
    wget
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
    nodejs \
    build-essential

ENV PATH ${WEBAPP_WORKDIR}/node_modules/.bin:$PATH

COPY bothub-word-suggestion-webapp/package.json ${WEBAPP_WORKDIR}/package.json

RUN cd ${WEBAPP_WORKDIR} && \
    npm install && \
    npm install -g @angular/cli@8.0.3

COPY bothub-word-suggestion-webapp/ ${WEBAPP_WORKDIR}
COPY bothub-word-suggestion-api/ ${API_WORKDIR}

RUN wget https://bothub-media.s3.amazonaws.com/bothub-word-suggestion/word2vec.vec -O ${API_WORKDIR}/word2vec.vec

RUN pip3 install -r /home/api/requirements.txt

RUN cd /
COPY run_all.sh .
RUN chmod +x run_all.sh

CMD ./run_all.sh
