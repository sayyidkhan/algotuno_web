## Overview
Added the following scripts:
- get_user_details.ts
- get_all_user.ts
- delete_user.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## get_user_details.ts
To get the details of a user, send a POST requst to the **/api/user/get_user_details** endpoint with the body contents as such:

Example:

```
{
    "username"      :   "test123"
}
```

OR

```
{
    "user_id"      :   "alskfhalskl123"
}
```

## get_all_user.ts
To get all users, send a GET request to the **/api/user/get_all_user** endpoint.

## delete_user.ts
To add a user, send a POST request to the **/api/user/delete_user** endpoint with the body contents as such:

Example:

```
{
    "username"      :   "test123"
}
```