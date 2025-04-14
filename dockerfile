# Use official Node image as base
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port and start the development server
EXPOSE 5173 
CMD ["npm", "run", "dev"]
