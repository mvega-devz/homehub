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

This repository currently contains the HH-16 monorepo foundation only.

It does not include generated React or Spring Boot applications yet. Those applications are intended to be created in their dedicated follow-up stories.

## Getting Started

There are no application services to install or run yet.

Future stories will add workspace scripts, application setup, Docker services, and CI workflows.

