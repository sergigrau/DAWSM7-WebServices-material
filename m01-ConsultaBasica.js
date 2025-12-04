/**
 * Back-end amb graphql, es pot provar amb POSTMAN o curl
 * @author sergi.grau@fje.edu
 * @version 1.0 4.12.25
 */

 /*
es pot provar amb 
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ salutacions }"}' \
http://localhost:4000/graphql
*/

const express = require('express');
// Express: framework per crear servidor HTTP i gestionar rutes
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra la implementació de GraphQL (graphql-http) amb Express
const { buildSchema } = require('graphql');
// buildSchema: construeix l'esquema GraphQL a partir d'una cadena SDL
 
// schema de GraphQL
const esquema = buildSchema(`
  type Query {
    salutacions: String
  }
`);
// L'esquema defineix un tipus `Query` amb un camp `salutacions` que retorna un String.
 
// Aquesta `arrel` (root) conté els resolvers: funcions que retornen dades per cada camp.
const arrel = {
    salutacions: () => {
    // Resolver per a la consulta `salutacions` — retorna la cadena al client
    return 'Hola Món!';
  },
};
 
const app = express();
// Montem el handler GraphQL a la ruta `/graphql`.
// El handler rep l'esquema i la `rootValue` (resolvers) per processar les consultes.
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));

// Inici del servidor: escolta al port 4000. Si vols un altre port, canvia aquest número.
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');