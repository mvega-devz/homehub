# HomeHub

HomeHub is a monorepo for the HomeHub product, organized to support frontend, backend, shared packages, documentation, Docker assets, and CI from a single repository.

## Repository Structure

```text
homehub/
  apps/
    web/
  services/
    api/
  packages/
    ui/
    types/
    config/
  docs/
    adr/
    architecture/
    api/
    database/
    product/
    sprints/
  docker/
  .github/
    workflows/
```

## Current Scope

This repository contains the HomeHub monorepo foundation, React web app, and
Spring Boot API service.

The API currently exposes an MVP profile endpoint for retrieving and updating
the current user profile. See [docs/api/profile.md](docs/api/profile.md).

## Getting Started

Install workspace dependencies:

```bash
npm install
```

Run the API:

```bash
cd services/api
./mvnw spring-boot:run
```
