module.exports = function (server, options){
   server.ext("onRequest", function (request, reply) {
      const override_method = request.headers["x-http-method-override"];

      if (override_method) {
         request.setMethod(override_method);
      }

      reply.continue();
   });
};
