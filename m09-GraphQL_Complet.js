const express  = require('express');
// Express: framework per crear servidor HTTP i gestionar rutes
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra `graphql-http` amb Express per gestionar l'endpoint `/graphql`
const { buildSchema } = require('graphql');
// buildSchema: construeix l'esquema GraphQL des d'una cadena SDL

/*
Exemple CRUD amb Alumnes
sergi.grau@fje.edu
04.12.25 versio 1

query {
  obtenirAlumnes {
    codi
    nom
  }
}

query {
  obtenirAlumne(codi:"2") {
    codi
    nom
  }
}

mutation {
  esborrarAlumne(codi:"1")
  afegirAlumne(nom:"PERE") {
    codi
    nom
  }
}

mutation {
  modificarAlumne(codi:"3", nom:"sergi") {
    codi
    nom
  }
}
*/

// Definició de l'esquema GraphQL amb SDL (Schema Definition Language)
// Tipus `Alumne`, consultes (`Query`) i mutacions (`Mutation`) per a operacions CRUD
const esquema = buildSchema(`
type Alumne {
  codi: ID!
  nom: String
}

type Query {
  obtenirAlumne(codi: ID!): Alumne
  obtenirAlumnes: [Alumne]
}

type Mutation {
  afegirAlumne(nom: String): Alumne
  modificarAlumne(codi: ID!, nom: String): Alumne
  esborrarAlumne(codi: ID!): Int
}
`);

// Resolvers: aquesta arrel (`arrel`) té una funció per a cada endpoint de l'API

// Base de dades falsa en memòria (normalment seria una BD real com MongoDB, PostgreSQL, etc.)
const alumnes = [
    { codi: '1', nom: 'SERGI' },
    { codi: '2', nom: 'ANNA' },
    { codi: '3', nom: 'JOAN' }
];

// Definició dels resolvers (funcions que retornen dades per a cada camp de l'esquema)
const arrel = {
    // Query: obté tots els alumnes
    obtenirAlumnes() {
        return alumnes;
    },
    // Query: obté un alumne per codi
    obtenirAlumne: ( {codi} ) => {
        let alumne = alumnes.find(a => a.codi == codi);
        if (!alumne) throw new Error('cap Alumne amb codi ' + codi);
        return alumne; 
    },
    // Mutation: crea un nou alumne amb codi aleatori
    afegirAlumne: ({ nom }) => {
        // crea un codi aleatori
        let codi = require('crypto').randomBytes(10).toString('hex');
        let alumne = new Alumne(codi, nom);
        alumnes.push(alumne);
        return alumne;
    },
    // Mutation: modifica el nom d'un alumne existent
    modificarAlumne: ({ codi, nom }) => {
        let alumne = alumnes.find(a => a.codi == codi);
        alumne.nom = nom;
        return alumne;
    },
    // Mutation: esborra un alumne per codi
    esborrarAlumne: ({codi})=>{
        let alumne = alumnes.find(a => a.codi === codi);
        let index = alumnes.indexOf(alumne);
        alumnes.splice(index, 1);
    }
};

const app = express();

// Muntatge de l'endpoint GraphQL amb `graphql-http` (seguint l'estructura de producto_3/app.js)
// `createHandler` rep l'esquema i la `rootValue` (resolvers) per processar les consultes.
// NOTA: `graphql-http` no inclou GraphiQL integrat. Per una UI, utilitza
// eines externes com Altair, GraphQL Playground, Postman, etc.
app.use('/graphql', createHandler({
    schema: esquema,
    rootValue: arrel,
}));

// Inicia el servidor al port 4000
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');

//Classe que representa un Alumne
class Alumne {
    constructor(codi, nom) {
        this.codi = codi;
        this.nom = nom;
    }
}