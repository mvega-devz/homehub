# Profile API

HomeHub exposes an MVP profile endpoint for retrieving and updating the current
user profile.

## Retrieve Profile

```http
GET /api/profile
```

Response:

```json
{
  "displayName": "HomeHub User",
  "email": "user@homehub.local"
}
```

## Update Profile

```http
PUT /api/profile
Content-Type: application/json
```

Request:

```json
{
  "displayName": "Miguel Vega",
  "email": "miguel@example.com"
}
```

Validation:

- `displayName` is required and must be 80 characters or fewer.
- `email` is required, must be valid, and must be 254 characters or fewer.
