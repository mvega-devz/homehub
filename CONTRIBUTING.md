# Contributing

Thank you for contributing to HomeHub.

## Development Guidelines

- Keep changes scoped to the Jira story being implemented.
- Do not generate frontend or backend applications outside their dedicated stories.
- Prefer small, reviewable pull requests.
- Update documentation when architectural or workflow decisions change.
- Keep placeholder directories tracked with `.gitkeep` until they contain real files.

## Code Quality

- Run `npm run lint` before opening a pull request that changes frontend or
  TypeScript code.
- Run `npm run format:check` before opening a pull request that changes files
  covered by Prettier.
- Use `npm run format` to apply the shared Prettier configuration.
- Configure editors to honor the repository `.editorconfig` file.
- Format Java code with `google-java-format`; see
  [docs/engineering/java-formatting.md](docs/engineering/java-formatting.md).

## Pull Requests

Before opening a pull request:

- Confirm the change matches the story acceptance criteria.
- Run any relevant checks once tooling exists.
- Include a summary of the change and note anything intentionally out of scope.
