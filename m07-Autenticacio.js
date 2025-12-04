
/**
 * Back-end amb graphql, que fa una autenticació amb Express.js
 * 
 * 
 * @autor sergi.grau@fje.edu
 * @version 1.0 03.12.25
 */


const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra `graphql-http` amb Express per gestionar l'endpoint `/graphql`
const { buildSchema } = require('graphql');

// Definim l'esquema amb buildSchema (SDL)
const esquema = buildSchema(`
type Query {
  ip: String
}
`);
 

const loggingMiddleware = (req, res, next) => {
  console.log('ip:', req.ip);
  next();
}
var arrel = {
  ip: function (args, request) {
    return request.ip;
  }
};
 
 
const app = express();
// Muntatge de l'endpoint GraphQL amb `graphql-http`.
// `graphql-http` no inclou la UI GraphiQL; si vols GraphiQL utilitza `express-graphql`.
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');
