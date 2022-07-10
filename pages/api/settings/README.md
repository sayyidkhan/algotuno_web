## Overview
Added the following scripts:
- add_setting.ts
- delete_setting.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## add_setting.ts
To add a setting, send a POST request to the **/api/settings/add_setting** endpoint with the body contents as such:

Example:

```
{
    "user_id"     : "cl4tnc7mq000609l7fd56e1j4",
    "config_name" : "testconf", 
    "config_value": "testval" 
}
```

## delete_setting.ts
To delete a setting, send a POST request to the **/api/settings/delete_setting*** endpoint with the body contents as such:

Example:

```
{
    "setting_id"    :   3
}
```

OR 

```
{
    "user_id"       :   "cl4tnc7mq000609l7fd56e1j4",
    "config_name"   :   "testconf"
}
```
