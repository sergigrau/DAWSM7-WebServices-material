
/**
 * Back-end amb graphql, que fa us de tipus avançats
 * 

 * 
 * @autor sergi.grau@fje.edu
 * @version 1.0 03.12.25
 */


const express = require('express');
// Express: framework per crear servidor HTTP i muntar rutes
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra `graphql-http` amb Express per gestionar l'endpoint `/graphql`
const graphql = require('graphql');

// Base de dades falsa en memòria per a exemples (normalment seria una BD real)
var fakeDatabase = {
  'a': {
    id: 'a',
    nom: 'alice',
  },
  'b': {
    id: 'b',
    nom: 'bob',
  },
};
 

// Definició d'un tipus `Usuari` amb camps `id` i `nom`.
let tipusUsuari = new graphql.GraphQLObjectType({
  name: 'Usuari',
  fields: {
    id: { type: graphql.GraphQLString },
    nom: { type: graphql.GraphQLString },
  }
});
 

// Definició del tipus `Query` que exposa la consulta `usuari(id)`.
// El camp `usuari` accepta un argument `id` i retorna un objecte `Usuari`.
let tipusConsulta = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    usuari: {
      type: tipusUsuari,
      // `args`: arguments que la consulta `usuari` accepta
      args: {
        id: { type: graphql.GraphQLString }
      },
      // `resolve`: funció que retorna les dades per aquest camp
      resolve: (_, {id}) => {
        // Retorna l'usuari des de la "BD" en memòria
        return fakeDatabase[id];
      }
    }
  }
});
 
// Creació de l'esquema a partir del tipus `Query` definit
let esquema = new graphql.GraphQLSchema({query: tipusConsulta});

const app = express();
// Muntatge de l'endpoint GraphQL amb `graphql-http`.
// `graphql-http` processa les consultes però no proveeix GraphiQL integrat;
// utilitza una eina externa (Altair, Playground) si necessites una UI.
app.use('/graphql', createHandler({
  schema: esquema,
}));

// Inicia el servidor a porta 4000
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');
