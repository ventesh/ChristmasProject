# Use a lightweight Node.js image as the base
FROM node:18-alpine
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the project
COPY . .
 
# Build the project using Webpack
RUN npm run build
 
# Expose the port (adjust if needed)
EXPOSE 8080
 
# Start the server (adjust the command as needed)
CMD ["node", "dist/index.html"]