# Beeper

Spotify track information utility

- bpm
- artist
- key
- etc

# Development

## What's inside?

This Remix Starter includes a [Turborepo](https://turbo.build/repo) that has the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `frontend`: a [Remix](https://remix.run/) app
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo
- `jest-presets`: jest configuration files
- `eslint-config-custom`: base eslint config for turborepo packages
- `eslint-config-server`: eslint config extension for servers

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Remix Starter includes a Turborepo that has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Deployment

- [x] Docker
  - `build-containers.sh` will run the necessary commands to stand up the api and frontend containers using `docker-compose`
    - this is a prod-like deployment, could work for a closer to bare metal deploy
  - `docker-compose up` will just run redis, configured for local development. You can run the turbo apps with `turbo run dev`
    for hot reloading
- [x] Railway
  - configure 3 services
    - frontend
    - api
    - redis
  - For the turborepo services, frontend and api, configure the env var NIXPACKS_TURBO_APP_NAME
    - set value to `frontend` for the frontend and `api` for the api
  - Configure the watch paths for each turborepo service to include that service's app dir and the `/packages` dir
  - Configure all env vars for each service as declared in the /apps/\*/.env.example files and /turbo.json
    - For redis env vars, copy the uri from the redis service config in railway

## Using this stack

Run the following command:

```sh
npx create-remix@latest --template cephalization/remix-house-stack
```

[Development Workflow](https://turbo.build/repo/docs/handbook/dev)
