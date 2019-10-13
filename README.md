# URL SHORTENER FOR BLUE CODING

SMALL APP FOR SHORTEN URL

## Requirements

You'll need to have installed:

Mongodb
Nodejs
Nginx

## Installation

You can download or clone this project.

```bash
git clone https://github.com/anthony321/url_shortener.git
```

Inside the project there are two important folders. 
build and server.

Folder server contains development code.
Folder build contains production optimized code.

Run the following to install dependencies:

```bash
npm install
```

In the file package json there are some important scripts:

```bash
npm run dev # this command allows you to run the code in dev mode
npm run prebuild # this command cleans up the build folder
npm run build # this command transpiles the code in server into ES15 and place it in the folder build
npm run start # this command runs the app in prod mode
```
Install globally pm2:
```bash
npm install -g pm2@latest
pm2 start ./build/index.js --name url_shortener # this will launch the app as a service
```

NGINX CONF:

We'll use nginx as a reverse proxy server for our node app.

Navigate to this folder:

```bash
cd /etc/nginx/conf.d
```
Then create new file named sitename.conf with the following conf:

```bash
    upstream backend {
    server localhost:3000; #node app address
    }

    server {
    listen 80;
    server_name ; bcurl.ddns.net #add your domain

    root /var/tools/public;

    location / {
    try_files $uri @backend;
    }

    location @backend {
    proxy_pass http://backend;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # Following is necessary for Websocket support
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    }
    }
```

I'm using noip.com to have a temporary free domain.

http://bcurl.ddns.net/ #This will expire in 30 days.



## Usage

Main endpoint: 

http://bcurl.ddns.net/api/url/

Methods:

```bash
POST: shorten #this method recieves param url and returns a short url as a json format.
        Params: 
            url

EXAMPLE:

curl -d "url=https://www.google.com" -X POST http://bcurl.ddns.net/api/url/shorten
```

```bash
GET: list #this method recieves param url and returns a short url as a json format.
        Params: 
            url

EXAMPLE curl -X GET http://bcurl.ddns.net/api/url/list
```

Finally, by visiting http://bcurl.ddns.net/<SHORT_URL_ID>
it'll return a javascript object as response:

{"code":1,"message":"You'll be redirected to: https://www.google.com","redirectTo":"https://www.google.com","tag":"REDIRECT_TO"}