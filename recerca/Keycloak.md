# Keycloak 

## Using Keycloak for App Authentication

Keycloak is an open-source identity and access management solution that can be used to handle the authentication of an app. Here are the steps to follow:

1. Install Keycloak: You can download and install Keycloak on your server or use the Docker image provided by the Keycloak team.

2. Create a Realm: A realm is a container for a set of users, credentials, and authentication mechanisms. You can create a new realm for your app or use an existing one.

3. Create a Client: A client represents your app in Keycloak. You need to create a new client and configure its settings, such as the allowed redirect URIs and the client secret.

4. Configure Authentication: You can configure various authentication mechanisms for your app, such as username/password authentication, social login, and multi-factor authentication. You can also customize the login page and the error messages.

5. Integrate with your App: Finally, you need to integrate Keycloak with your app. You can use the Keycloak SDKs for various programming languages or use the OpenID Connect protocol to communicate with Keycloak.

Once you have completed these steps, your app will be able to authenticate users using Keycloak. Keycloak will handle the authentication flow, store the user credentials securely, and provide various features such as single sign-on and user management.

## Authenticating a user with Go

This code creates a new Keycloak client and sets up an authentication request using a username and password.
It then uses the resulting token to make an authenticated request to a backend server.
If any errors occur during the process, they are printed to the console.

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/Nerzal/gocloak/v8"
)

func main() {
    // Create a new Keycloak client
    client := gocloak.NewClient("https://keycloak.example.com")

    // Set up the authentication request
    req := gocloak.TokenRequest{
        GrantType:    "password",
        ClientID:     "my-client-id",
        ClientSecret: "my-client-secret",
        Username:     "my-username",
        Password:     "my-password",
    }

    // Authenticate the user
    token, err := client.Login(req)
    if err != nil {
        fmt.Printf("Failed to authenticate user: %v", err)
        return
    }

    // Use the token to make an authenticated request to the backend
    req, err := http.NewRequest("GET", "https://my-backend.example.com", nil)
    if err != nil {
        fmt.Printf("Failed to create request: %v", err)
        return
    }
    req.Header.Set("Authorization", "Bearer "+token.AccessToken)

    // Make the request
    client := http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Failed to make request: %v", err)
        return
    }
    defer resp.Body.Close()

    // Handle the response
    fmt.Printf("Response status: %v", resp.Status)
}

```

## Integration of Keycloak token with React app

This code sets up an axios instance with the token received during authentication as the authorization header.
It then uses this instance to make a request to a private route and sets the response data to the component's state.
This allows the component to render the private data. Note that the token is retrieved from local storage, which is not the most secure method and should be avoided in production.

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PrivateComponent = () => {
    const [data, setData] = useState([]);

useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Set up axios instance with token as authorization header
    const axiosInstance = axios.create({
    baseURL: "https://example.com/api",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    });

    // Make request to private route
    axiosInstance.get("/private").then((response) => {
    setData(response.data);
    });
}, []);

return (
    <div>
    {data.map((item) => (
    <p key={item.id}>{item.name}</p>
    ))}
    </div>
);
};

export default PrivateComponent;
```

### Headless connection with Keycloak
To connect to the Keycloak admin panel running on a headless VPS in the cloud, you can follow these steps:

1. SSH into your VPS using your terminal or SSH client.
2. Navigate to the Keycloak installation directory.
3. Start the Keycloak server by running the command ./bin/standalone.sh -Djboss.bind.address=0.0.0.0.
4. Open your web browser and enter the IP address of your VPS followed by the port number 8080 (e.g. http://123.456.789.123:8080).
5. You should see the Keycloak login page. Enter the admin credentials you set up during installation.
6. Once logged in, you can access the Keycloak admin panel and manage your realm, clients, users, and other settings.

Note: If you are accessing the Keycloak admin panel from a remote location, make sure to configure your firewall and network settings to allow incoming traffic on port 8080.

### Token validation with Golang
To validate an authentication token received from a client with a Keycloak server, the backend typically needs to perform the following steps:

1. Parse the token to extract its claims and signature.
2. Retrieve the public key of the Keycloak server to verify the signature.
3. Verify the token's expiration time and other claims to ensure it is still valid.
4. Check if the token has the required roles or permissions to access the requested resource.

Here is an example of a Go middleware that performs token validation using the Keycloak Go SDK:

```go
package main

import (
    "net/http"
    "github.com/dgrijalva/jwt-go"
    "github.com/keycloak/keycloak-go"
)

func ValidateToken(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        tokenString := r.Header.Get("Authorization")
        if tokenString == "" {
            http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
            return
        }

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            // Retrieve the public key of the Keycloak server to verify the signature
            keycloakConfig := keycloak.Config{
                Realm: "myrealm",
                AuthServerURL: "https://keycloak.example.com/auth",
            }
            keycloakClient := keycloak.NewClient(&keycloakConfig)
            publicKey, err := keycloakClient.GetRealmPublicKey()
            if err != nil {
                return nil, err
            }
            return jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
        })
        if err != nil {
            http.Error(w, err.Error(), http.StatusUnauthorized)
            return
        }

        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

        // Check if the token has the required roles or permissions to access the requested resource
        if !hasRequiredRoles(claims) {
            http.Error(w, "Missing required roles", http.StatusForbidden)
            return
        }

        // Token is valid and has the required roles, call the next middleware or handler
        next.ServeHTTP(w, r)
    })
}

func hasRequiredRoles(claims jwt.MapClaims) bool {
    // Check if the token has the required roles or permissions to access the requested resource
    // ...
    return true
}
```

This middleware first retrieves the token from the `Authorization` header of the HTTP request. It then uses the Keycloak Go SDK to retrieve the public key of the Keycloak server and parse the token's signature. If the signature is valid, it checks the token's expiration time and other claims to ensure it is still valid. Finally, it checks if the token has the required roles or permissions to access the requested resource, and calls the next middleware or handler if everything is valid. If any of these checks fail, it returns an HTTP error with the appropriate status code.