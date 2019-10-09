FROM ubuntu:18.04

ENV WORKDIR /app
WORKDIR $WORKDIR

RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    wget

RUN rm -rf /var/lib/apt/lists/*

COPY . .

RUN wget https://bothub-media.s3.amazonaws.com/bothub-word-suggestion/word2vec.vec -O $WORKDIR/word2vec.vec

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD python3 api.py