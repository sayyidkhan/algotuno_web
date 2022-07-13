## Overview
Added the following scripts:
- update_subscription.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## update_subscription.ts
To update a user's subscription plan, send a POST request to the **/api/subscription/update_subscription** endpoint with the body contents as such:

Example:

```
{
    "user_id" : "1asidojasdl1k",
    "subscription_plan_id"  : 1 
}
```