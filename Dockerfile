# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the local compose-spec.json file into the image
COPY compose-spec.json /app/compose-spec.json

# Expose port 3000 (adjust if your application uses a different port)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
