# To build the image and send it to the docker daemon

npm install 
tsc -p tsconfig.app.json
docker rmi ochoreinasv1   (just to be sure, it image exists beforehand, it will remove it from Docker)
docker build . -t ochoreinasv1
