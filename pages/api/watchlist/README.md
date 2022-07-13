## Overview
Added the following scripts:
- get_watchlist.ts
- update_watchlist.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## get_watchlist.ts
To get a user's stock watchlist, send a POST request to the **/api/watchlist/get_watchlist** endpoint with the body contents as such:

Example:

```
{

    "user_id" : "1asidojasdl1k" 
}
```

## update_watchlist.ts
To update a user's stock watchlist, send a POST request to the **/api/watchlist/update_watchlist** endpoint with the body contents as such:

Example:

```
{
    "user_id"   :   "1asidojasdl1k",
    "stocks"    :   [1,2,3,4,5]
}
```