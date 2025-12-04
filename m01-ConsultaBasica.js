/**
 * Back-end amb graphql, es pot provar amb POSTMAN o GraphQLi o curl
 * @author sergi.grau@fje.edu
 * @version 1.0 13.12.20
 */

 /*
es pot provar amb 
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ salutacions }"}' \
http://localhost:4000/graphql
*/

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
 
// schema de GraphQL
const esquema = buildSchema(`
  type Query {
    salutacions: String
  }
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API
const arrel = {
    salutacions: () => {
    return 'Hola Món!';
  },
};
 
const app = express();
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');