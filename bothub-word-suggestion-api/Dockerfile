FROM python:3.6

ENV WORKDIR /home/app
WORKDIR $WORKDIR

RUN apt-get update

COPY . .

RUN wget https://bothub-media.s3.amazonaws.com/bothub-word-suggestion/word2vec.vec -O word2vec.vec

RUN pip install -r requirements.txt

EXPOSE 5000

RUN ["python", "api.py"]