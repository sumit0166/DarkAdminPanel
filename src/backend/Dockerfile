FROM node:latest

WORKDIR /root/nodeServer/app/bin

COPY bin .
COPY components ../components
COPY config ../configuration
COPY node_modules ../node_modules
COPY package.json ../
COPY backendServer.js ../

RUN apt-get update && \
    apt-get install -y jq && \
    apt-get install -y iputils-ping \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN chmod 777 ./installDep.sh

RUN ./installDep.sh

EXPOSE 3001

# CMD [ "node", "backendServer.js" ]
CMD [ "bash" , "Run.sh"]