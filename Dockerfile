FROM node:18.17.1-alpine
RUN apt-get update 
# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD node server.js
