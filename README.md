# KANBAN APP BE-17
# API Spec
## Login
#### Endpoint :

*   **/api/v2/auth/login**

#### Request :

*   Method : **POST**
*   Request Body :

    | key | Data Type | Mandatory | Desc |
    | --- | --- | --- | --- |
    | email | String | Yes | The email user input |
    | password | String | yes | Encrypt using HMAC SHA256 and then sent ?? |

*   Request Header :

    | key | Data Type | Mandatory | Desc | Example |   |
    | --- | --- | --- | --- | --- | --- |
    | Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |   |

### Response :
### Success response :

- Status Code : 200
    - `access_token` used to access feature with authentication, valid 24 hours
    - `refresh_token` used to re-generate new `access_token` , when the `access_token` is expired, valid until 1 week

        ```jsx
        {
            "status": true,
            "access_token": "eyJ0eXAiOiJKV1QiL........",
            "refresh_token": "eyJ0eXAiOiJKV1Qi........",
            "user": {
                "id": "62a181254a08d",
                "fullname": "madhan",
                "jenis_kelamin": "laki-laki",
                "tgl_lahir": "2001-12-07",
                "role": "admin",
                "alamat" : "asdada"
                "image" : "hhtps//wwweasd"
            }
        }
        ```

### Failed response :

- Status Code : 422
    - Bad request: when something problem is in the account. eg: email not registered, the wrong password, account inactivated, etc

        ```jsx
        {
            "status": false,
            "message": "Password Salah."
        }
        ```

        ```php
        {
            "status": false,
            "message": "Akun Tidak Aktif."
        }
        ```

        ```php
        {   
            "status": false,
            "message": "Email Tidak Terdaftar."
          }
        ```
    
    
    
    
    
- Status Code : 409 (unexpected failed)
    
    ```jsx
    {
        "status": false,
        "message": "Something problem"
    }
    ```
## Register
### Endpoint :

*   **/api/v2/auth/register**

### Request :

*   Method : **POST**
*   Request Header : - 
*   Request Body :

    | key | Data Type | Mandatory | Desc |
    | --- | --- | --- | --- |
    | fullname | String | Yes | required, min 3 char, max 128 char |
    | email | String | Yes | required, unique, must be an email |
    | password | String | yes | required, min 8 characters consist  |
    | password_confirmation | String | yes | equired, password same  |

### Response :
### Success response :

- Status Code :  201
    ```
        {
           "status": true,
           "message": "Pendaftaran User Baru Berhasil.",
           "email": "melly.tiara92@gmail.com"
        }
    ```

### Failed response :

- Status Code : 422
    - Validation form: not sent with the valid data request.

        ```json
            {
                "status": false,
                "message": "Data yang diberikan tidak valid.",
                "errors": {
                    "email": [
                        "Email wajib diisi."
                    ],
                    "password": [
                        "Password wajib diisi."
                    ]
            }
        ```
    
- Status Code : 409 (unexpected failed)
    
    ```json
       {
        "status": false,
        "message": "Pendaftaran User baru gagal!"
        }
    ```
    
    
## Refresh Token
### Endpoint :

- **/api/v2/auth/refresh-token**

### Request :

- Method POST
- Request Body:

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| refresh_token | String | Yes | refresh_token is obtained at login, as authentication, if want to get new access token |

### Success response :

- Status Code : 200

```jsx
{
    "status": true,
    "access_token": "eyJ0eXAiOiJKV1QiL........"
}
```

### Failed response :

- Status Code : 400
    - Bad request : there is a problem with the refresh token that was sent, it could be because it has expired or is not valid.

```jsx
{
    "status": false,
    "message": "Refresh token has expired or is invalid, please re-login"
}
```

- status code :409 (unexpected failed)

```php
{
    "status": false,
    "message": "Something problem", 
    "error": {
        "message": ".....",
        "full": "....."
    }
}
```
## Logout
### Endpoint :

- **/api/v2/auth/logout**

### Request :

- Method : **POST**
- Request Body :

| key | Data Type | Mandatory | Desc | 
| --- | --- | --- | --- |
| refresh_token | string | yes | refresh_token is obtained at login, it will be used to revoke this so it can't be used anymore |
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |

### Response :

### Success response :

- Status Code : 200

```jsx
{
    "status": true,
    "message": "User logged out successfully."
}
```

### Failed response :

- Status Code : 422
    - Validation form: not sent with the valid data request. eg: not send refresh_token

```jsx
{
    "status": false,
    "message": "Data yang diberikan tidak valid.",
    "errors": {
        "refresh_token": [
            "Refresh token wajib diisi."
        ]
    }
}
```

- Status Code : 400  Bad Request  when sending an invalid Refresh Token
    
    ```jsx
    {
        "status": false,
        "message": "This token is invalid. Please login."
    }
    ```
    
- Status Code : 409 (unexpected failed)
    
    ```jsx
    {
        "status": false,
        "message": "Sorry, the user cannot be logged out!",
        "error": {
            "message": ".....",
            "full": "....."
        }
    }
    ```
