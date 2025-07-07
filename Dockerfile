# Node image to be use for building this app's image
FROM node:12.22.1-alpine3.11

# Create app directory. This is the container dir
WORKDIR /app

#From here on, the app is our target dir, so:
# npm install will instal in /app/node_modules, for exmple

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source. Copy the content of the actual dir, to the container dir
COPY . .

#The app binds to port 3000
#so you'll use the EXPOSE instruction to have it mapped by the docker daemon:

EXPOSE 3000
CMD ["node", "/app/build/app.js"]
