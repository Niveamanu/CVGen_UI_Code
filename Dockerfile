de# Base image
FROM node:20-alpine
 
# Set working directory
WORKDIR /app
 
# Use HTTP instead of HTTPS to bypass SSL trust issues temporarily
RUN sed -i 's/https/http/' /etc/apk/repositories && \
    apk add --no-cache ca-certificates && \
    update-ca-certificates
 
# Install dependencies
COPY package.json package-lock.json ./
 
# Disable strict SSL (if required due to corporate CA issues)
#RUN npm config set strict-ssl false && npm install
RUN npm config set strict-ssl false && npm install --legacy-peer-deps

# Copy source files
COPY . .
# Build the application for the specified environment
RUN npm run build
 
# Install serve to run the built application
RUN npm install -g serve
 
# Expose port 5173 for the built application
EXPOSE 5173
 
# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "5173"]
