# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build --filter=frontend...
CMD npm start --filter=frontend