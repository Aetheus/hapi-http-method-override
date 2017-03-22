"use strict";

exports.register = function (server, custom_options, next) {
   const Strategies = {
      QUERY : "query",
      X_HTTP_METHOD_OVERRIDE : "x-http-method-override"
   };

   const default_options = {
      strategy : Strategies.QUERY,

      //for QUERY strategy
      query_override_key : "_method"
   };

   //merge with default options in case certain options weren't provided
   const options = Object.assign({}, default_options, custom_options);

   switch(options.strategy){
   case Strategies.QUERY : {
      require("./strategies/query")(server, options);
      break;
   }
   case Strategies.X_HTTP_METHOD_OVERRIDE : {
      require("./strategies/x_http_method_override")(server, options);
      break;
   }
   default : {
      throw new Error(`The HTTP override strategy entered [${options.strategy}] did not match any known strategies!`);
   }
   }

   next();
};

exports.register.attributes = {
   pkg : require("./package")
};
