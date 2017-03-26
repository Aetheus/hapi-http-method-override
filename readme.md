
# hapi-http-method-override
-----
## Info
A simple and non-destructive Hapi.js plugin for overriding HTTP methods. Useful for clients (like browsers) that don't have native methods of sending special (e.g: PUT, PATCH, DELETE) requests. Simply choose between two method overriding strategies (using a URL query parameter, or using the "x-http-method-override" header).

In either case, _you wouldn't have to modify your existing API routes_.


---------------

## Usage Options
The plugin provides two "strategies" when it comes to overriding HTTP requests - one uses a simple query parameter, and another uses a header. For instance, in order to send a DELETE request to  "http://your-awesome-api-that-doesnt-exist-yet.com/users/1" with either strategy, follow the instructions below:

- **The `query` strategy**:

   Send a POST request to  "http://your-awesome-api-that-doesnt-exist-yet.com/users/1?_method=DELETE". Note the **_method** query parameter - this is configurable (see the ["Basic Usage/Configuration"](#basic-usageconfiguration) section)

- **The `x-http-method-override` strategy**:

   Send a POST request to "http://your-awesome-api-that-doesnt-exist-yet.com/users/1", but with a HTTP header of `x-http-method-override` that's been set to `DELETE`


-----------------------


## Basic Usage/Configuration
Simply require the package and register it with hapi's server.register function. The package itself only takes two **optional** parameters:
"`strategy`" and "`query_method override`".
```
server.register({
    register: require("hapi-http-method-override"),
    options: {
        strategy : "query",
        query_override_key : "_custom_override_method"
    }
}, (err) => {
   // ...
});
```

- **`strategy` parameter**:

   Takes a single string value to choose your strategy. Possible options are:
    - `"query"`
    - `"x-http-method-override"`

  See ["Usage Options"](#usage-options) for details on these strategies. **Defaults to `"query"`.**



- **`query_override_key` parameter:**

   Takes a single string value. **Only used in conjuction with the `query` strategy**. This is used to override the query parameter name used by the `query` strategy, in case the default "`_method`" parameter name is already being used by your application.

   **Defaults to `"_method"`.**


-----------------------

## Full Usage Example

```
//create hapi.js Server instance
const server = require('hapi').Server();
server.connection({ port: 8080, host: 'localhost' });

//require and define the options for hapi-http-override
const hapi_http_override_options = {
    register: require("hapi-http-method-override"),
    //define your options here
    options: {
        strategy : "query",
        query_override_key : "_custom_override_method"
    }
}

//register hapi-http-override
server.register(hapi_http_override_options, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    //start the server
    server.start((err) => {
      if (err) {
         throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);

      //if you send a request to "/test_http_override?_custom_override_method=put",
      //you should see it respond with "You just sent a put request!"
      server.route({
         method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
         path: '/test_http_override',
         handler: function (request, reply) {
              reply(`You just sent a ${request.method} request!`);
         }
      });
    });

});
```
