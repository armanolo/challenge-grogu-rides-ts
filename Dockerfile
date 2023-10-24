# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
#RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV ${ENV_AREA:-production}
ENV REACT_APP_GROGU_RIDE ${REACT_APP_GROGU_RIDE}
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
#CMD [ "npx", "serve", "build" ]
ENTRYPOINT /bin/sh -x ./entrypoint.sh && npm run build && npx serve build