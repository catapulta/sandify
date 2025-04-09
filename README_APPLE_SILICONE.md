I'm using colima with 

```
colima start x86 \
  --arch x86_64 \
  --vm-type=vz \
  --vz-rosetta  
INFO[0000] starting colima [profile=x86]                
INFO[0000] runtime: docker                              
INFO[0002] creating and starting ...                     context=vm
INFO[0064] provisioning ...                              context=docker
INFO[0070] starting ...                                  context=docker
INFO[0146] done  
```

then 

docker context use colima-x86
docker-compose up

Why the error?

```
cat Dockerfile 
# Dockerfile for development of sandify

FROM node:20.18.1

RUN npm install -g npm
#RUN npm install -g

RUN mkdir /srv/app && chown node:node /srv/app

#COPY . /srv/app

USER node

WORKDIR /srv/app

CMD [ "npm", "start" ]
```

```
cat docker-compose.yml     

# build with:
#   docker-compose build sandify
#
# install/update with:
#   docker-compose run --entrypoint "npm install" sandify
#
# run with:
#   docker-compose run sandify
#
# test with:
#   docker-compose run --entrypoint "npm test" sandify
#
version: '3.7'

services:
  sandify:
    platform: linux/amd64
    image: sandify
    build: .
    container_name: sandify
    ports:
        - "3000:3000"
    volumes:
        - .:/srv/app
    network_mode: "host"
```
