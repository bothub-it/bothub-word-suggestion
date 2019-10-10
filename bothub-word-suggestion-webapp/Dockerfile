FROM ubuntu:18.04

ENV WORKDIR /app
WORKDIR $WORKDIR

# Install Node.js
RUN apt-get update && \
    apt-get install -y \
    curl nginx

RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y \
    nodejs \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV PATH /home/app/node_modules/.bin:$PATH

COPY . /app

RUN npm install
RUN npm install -g @angular/cli@8.0.3

EXPOSE 80

RUN ng build --prod

RUN rm -rf /var/www/html/ && cp -rf /app/dist/angular-material-login-template/ /var/www/html/

CMD ["nginx", "-g", "daemon off;"]