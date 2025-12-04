
/**
 * Back-end amb graphql, que mostra com crear mutacions en el back-end,
 * i que fa us de input types per a poder repetir determinats arguments,
 * query a realitzar
 * 
 mutation {
  crearMissatge(input: {
    autor: "sergi",
    contingut: "graphql molt potent",
  }) {
    id
  }
}

{
  getMissatge(id:"bfcae6ad741a6c71a107") {
    id
    autor
    contingut
  }
}


mutation{
  actualitzarMissatge( id: "bfcae6ad741a6c71a107", input: {
    autor: "JOAN",
    contingut: "graphql molt potent",
  }) {
    id
  }
}

 * 
  
 * 
 * @autor sergi.grau@fje.edu
 * @version 1.0 03.12.25
 */


const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra la implementació `graphql-http` amb Express
// Nota: `graphql-http` processa peticions GraphQL però no inclou la UI GraphiQL
const { buildSchema } = require('graphql');
 
// schema de GraphQL, ! vol dir que NO POT SER NULL
const esquema = buildSchema(`
input MissatgeEntrada {
  contingut: String
  autor: String
}

type Missatge {
  id: ID!
  contingut: String
  autor: String
}

type Query {
  getMissatge(id: ID!): Missatge
  obtenirMissatges: [Missatge]
}

type Mutation {
  crearMissatge(input: MissatgeEntrada): Int
  actualitzarMissatge(id: ID!, input: MissatgeEntrada): Missatge
}
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API

// Normalment seria una BD
const fakeDatabase = {};
 
const arrel = {
  getMissatge: ({id}) => {
    if (!fakeDatabase[id]) {
      throw new Error('cap Missatge amb id ' + id);
    }
    return new Missatge(id, fakeDatabase[id]);
  },

  obtenirMissatges: () => {
    return Object.keys(fakeDatabase).map(key => {
      return new Missatge(key, fakeDatabase[key]);
    });
  },
  crearMissatge: ({input}) => {
    // crea un id aleatori
    let id = require('crypto').randomBytes(10).toString('hex');
    console.log(id);
    fakeDatabase[id] = input;

    //retorna el nombre d'enregistraments
    return Object.keys(fakeDatabase).length;
  },
  actualitzarMissatge: ({id, input}) => {
    if (!fakeDatabase[id]) {
      throw new Error('cap Missatge amb id ' + id);
    }
    fakeDatabase[id] = input;
    return new Missatge(id, input);
  },
};
 
const app = express();
// Serveix fitxers estàtics des de `public` (client HTML/JS/CSS)
app.use(express.static('public'))

// Muntatge de l'endpoint GraphQL a `/graphql` utilitzant `graphql-http`.
// `graphql-http` no proporciona la UI GraphiQL integrada. Si necessites
// la UI a la mateixa ruta, utilitza `express-graphql` amb `graphiql: true`.
app.use('/graphql', createHandler({
  schema: esquema,
  rootValue: arrel,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');


//Classe que representa un missatge
class Missatge {
  constructor(id, {contingut, autor}) {
    this.id = id;
    this.contingut = contingut;
    this.autor = autor;
  }
}
 