module.exports = function (server, options){
   const query_override_key = options.query_override_key;

   server.ext("onRequest", function (request, reply) {
      const override_method = request.query[query_override_key];

      if (override_method) {
         request.setMethod(override_method);
      }

      reply.continue();
   });
};
