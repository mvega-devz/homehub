# Java Formatting

HomeHub Java code follows the formatting produced by `google-java-format`.

## Rules

- Use Java 21 language features supported by the API service.
- Use spaces for indentation.
- Use two-space indentation for blocks and four-space continuation indentation
  where the formatter applies it.
- Keep imports organized and remove unused imports before committing.
- Do not commit unrelated mechanical formatting changes with feature work.

## Editor Setup

Configure the IDE to run `google-java-format` for Java files and to honor the
repository `.editorconfig` file. Format changed Java files before committing.

## Enforcement

The repository documents the Java formatter standard in HH-20. Automated Maven
format enforcement can be added in a separate story when the team chooses the
exact plugin and lifecycle behavior.
