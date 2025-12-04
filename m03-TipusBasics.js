
/**
 * Back-end amb graphql, que mostra com s'utilitzen els tipus bàsics
 * @author sergi.grau@fje.edu
 * @version 1.0 04.12.25
 */


const express = require('express');
// Express: framework per crear servidor HTTP i gestionar rutes
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra la implementació de GraphQL (graphql-http) amb Express
// Nota: `graphql-http` gestiona les peticions GraphQL però no inclou una UI GraphiQL
const { buildSchema } = require('graphql');
// buildSchema: construeix l'esquema GraphQL a partir d'una cadena SDL (Schema Definition Language)
 
// Schema de GraphQL
// Defineix els tipus i les consultes disponibles en l'API.
const esquema = buildSchema(`
  type Query {
    citaDelDia: String
    aleatori: Float!
    llencem3copsUnDau: [Int]
  }
`);
// Explicació:
// - `citaDelDia`: retorna un text (String)
// - `aleatori`: retorna un Float no-null (!) amb un valor aleatori
// - `llencem3copsUnDau`: retorna una llista d'Int amb tres llançaments de dau
 
// Aquesta `arrel` (root) conté els resolvers: funcions que s'executen en resposta
// a cada camp definit a l'esquema. Aquí retornem valors senzills per exemple.
const arrel = {
  citaDelDia: () => {
    // Retorna una cadena aleatòria com a "cita del dia"
    return Math.random() < 0.5 ? 'cal estudiar més GraphQL' : 'cal practicar més GraphQL';
  },
  aleatori: () => {
    // Retorna un nombre aleatori (Float)
    return Math.random();
  },
  llencem3copsUnDau: () => {
    // Retorna una llista amb 3 valors entre 1 i 6 (simulació de 3 llançaments de dau)
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};
 
const app = express();
// Serveix recursos estàtics des de la carpeta `public` (ex: fitxers HTML/JS del client)
app.use(express.static('public'))

// Muntatge del endpoint GraphQL a `/graphql` utilitzant `graphql-http`.
// `createHandler` rep l'esquema i la `rootValue` (resolvers) per processar les consultes.
// IMPORTANT: `graphql-http` no proporciona la interfície GraphiQL integrada; per
// a una UI d'exploració pots utilitzar una eina externa o canviar a `express-graphql`.
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));

// Inici del servidor: escolta al port 4000
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');