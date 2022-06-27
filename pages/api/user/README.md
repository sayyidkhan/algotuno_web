## Overview
Added the following scripts:
- add_superuser.ts
- delete_superuser.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## add_superuser.ts
To add a superuser, send a POST request to the **/api/user/add_superuser** endpoint with the body contents as such:

Example:

```
{
    "username"      :   "test123"
}
```

## delete_superuser.ts
To delete a superuser, send a POST request to the **/api/user/add_superuser** endpoint with the body contents as such:

Example:

```
{
    "username"      :   "test123"
}
```

