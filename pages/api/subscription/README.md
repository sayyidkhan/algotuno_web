## Overview
Added the following scripts:
- update_user_subscription.ts
- add_subscription_plan.ts
- get_all_subscription_plan.ts
- update_subscription_plan.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## update_user_subscription.ts
To update a user's subscription plan, send a POST request to the **/api/subscription/update_user_subscription** endpoint with the body contents as such:

Example:

```
{
    "user_id" : "1asidojasdl1k",
    "subscription_plan_id"  : 1 
}
```

## add_subscription_plan.ts
To add a new subscription plan, send a POST request to the **/api/subscription/add_subscription_plan** endpoint with the body contents as such:

Example:
```
{
    "plan_name" : "some plan name",
    "price"     : 55
}
```

## get_all_subscription_plan.ts
To get all the subscription plans and the **users_id** (all users) for each subscription plan, send a GET request to the **/api/subscription_get_all_subscription_plan** endpoint.

## update_subscription_plan.ts
To update the details of a subscription plan, send a POST request to the **/api/subscription/update_subscription_plan** endpoint with the body contents as such:

Example:

```
{
    "subscription_plan_id" : 1,
    "plan_name" : "Flex",
    "price"     : 30
}
```

Notes:
- To update only the **plan_name**, omit the **price** field and vice versa.