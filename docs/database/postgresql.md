# PostgreSQL

HomeHub uses PostgreSQL for the API when the `postgres` Spring profile is active.

## Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `HOMEHUB_DB_NAME` | `homehub` | Database created by Docker Compose. |
| `HOMEHUB_DB_USERNAME` | `homehub` | PostgreSQL user used by Docker Compose and the API. |
| `HOMEHUB_DB_PASSWORD` | `homehub` | PostgreSQL password used by Docker Compose and the API. |
| `HOMEHUB_DB_HOST` | `localhost` | PostgreSQL host for local tooling. |
| `HOMEHUB_DB_PORT` | `5432` | Host port published by Docker Compose. |
| `HOMEHUB_DB_URL` | `jdbc:postgresql://localhost:5432/homehub` | JDBC URL used by the API `postgres` profile. |

Copy `.env.example` to `.env` for local development and override values as needed.

## Local Startup

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Run the API against PostgreSQL:

```bash
cd services/api
SPRING_PROFILES_ACTIVE=postgres ./mvnw spring-boot:run
```

The `postgres-data` Docker volume persists database files across container restarts.
