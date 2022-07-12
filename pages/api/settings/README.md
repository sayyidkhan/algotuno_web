## Overview
Added the following scripts:
- add_or_update_setting.ts
- delete_setting.ts
- get_all_setting.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## add_or_update_setting.ts
To add/update a setting, send a POST request to the **/api/settings/add_setting** endpoint with the body contents as such:

Example:

```

    "config_name" : "testconf", 
    "config_value": "testval" 
}
```

## delete_setting.ts
To delete a setting, send a POST request to the **/api/settings/delete_setting** endpoint with the body contents as such:

Example:

```
{
    "setting_id"    :   3
}
```

OR 

```
{
    "config_name"   :   "testconf"
}
```

## get_all_setting.ts
To get all settings, send a GET request to the **/api/settings/get_all_settings** endpoint.