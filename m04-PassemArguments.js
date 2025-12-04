
/**
 * Back-end amb graphql, que mostra com es poden passar arguments,
 * fa servir fetch com a client
 * @author sergi.grau@fje.edu
 * @version 1.0 03.12.25
 */


const express = require('express');
// Express: framework per crear servidor HTTP i servir rutes/fitxers estàtics
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra la implementació `graphql-http` amb Express
// Nota: `graphql-http` processa les peticions GraphQL però no inclou la UI GraphiQL
const { buildSchema } = require('graphql');
// buildSchema: construeix l'esquema GraphQL des d'una cadena SDL
 
// Schema de GraphQL
// Defineix la consulta `tirarDau` que rep dos arguments:
// - `numVegades` (Int!, obligatori) i
// - `numCares` (Int, opcional)
// Retorna una llista d'enters ([Int]) amb els resultats dels llançaments.
const esquema = buildSchema(`
  type Query {
    tirarDau(numVegades: Int!, numCares: Int): [Int]
  }
`);
 
// Aquesta `arrel` (root) conté els resolvers: funcions que s'executen quan
// es crida la consulta `tirarDau` des del client.
const arrel = {
  tirarDau: ({numVegades, numCares}) => {
    // `numVegades` indica quantes vegades llencem el dau; `numCares` indica
    // quantes cares té el dau (si no es passa, es fa servir 6 per defecte).
    var sortida = [];
    for (var i = 0; i < numVegades; i++) {
      sortida.push(1 + Math.floor(Math.random() * (numCares || 6)));
    }
    // Retornem una llista d'enters amb els resultats dels llançaments
    return sortida;
  }
};
 
const app = express();
// Serveix fitxers estàtics des de `public` (p. ex. client HTML/JS/CSS)
app.use(express.static(__dirname));

// Muntatge de l'endpoint GraphQL a `/graphql` amb `graphql-http`.
// `createHandler` rep l'esquema i la `rootValue` (resolvers) per processar
// les consultes POST/GET que arriben al servidor.
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));

// Inici del servidor: escolta al port 4000
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');