# Dockerfile for development of sandify
FROM node:20.18.1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Vite globally
RUN npm install -g vite

# We'll copy the code in the docker-compose.yml via volumes
# Set proper permissions for the working directory
RUN mkdir -p /app/node_modules && chown -R node:node /app

# Use node user for better security
USER node

# Expose development port
EXPOSE 3000

# Start development server with host flag to accept external connections
CMD ["npm", "run", "start", "--", "--host"]
