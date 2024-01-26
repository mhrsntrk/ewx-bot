
# Use the Node.js 21 Alpine image from the official Node.js Docker Hub repository
FROM node:21-alpine

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the Docker image
COPY package*.json ./

# Install dependencies in the Docker image
RUN npm install --production

# Copy the rest of the application source code to the Docker image
COPY . .

# Your app listens on port 3000, make sure you expose it.
EXPOSE 5500

# Define the command to run your app
CMD [ "node", "index.js" ]
