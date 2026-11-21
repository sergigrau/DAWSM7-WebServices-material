# M09 - GraphQL Modular - Gestió d'Alumnes

Exemple d'aplicació GraphQL amb estructura modular seguint el patró de `producto_3`.

## 📁 Estructura del projecte

```
m09_modular/
├── app.js           # Servidor Express i configuració de GraphQL
├── schema.graphql   # Definició de l'esquema GraphQL (tipus, queries, mutations)
├── resolvers.js     # Funcions que gestionen les operacions GraphQL
├── db.js            # Gestió de la "base de dades" (en memòria per aquest exemple)
├── package.json     # Dependències del projecte
└── README.md        # Aquest fitxer
```

## 🚀 Instal·lació i ús

Aquest exemple està actualitzat per a Node.js 26 i Express 5.

### 1. Instal·lar dependències
```bash
cd m09_modular
npm install
```

### 2. Executar el servidor
```bash
npm start
```

O amb auto-reload (si tens nodemon instal·lat):
```bash
npm run dev
```

### 3. Accedir a l'API

- **Endpoint GraphQL:** http://localhost:4000/graphql
- **Pàgina informativa:** http://localhost:4000/

## 📝 Exemples de consultes

### Query - Obtenir tots els alumnes
```graphql
{
  obtenirAlumnes {
    codi
    nom
  }
}
```

### Query - Obtenir un alumne específic
```graphql
{
  obtenirAlumne(codi:"2") {
    codi
    nom
  }
}
```

### Mutation - Afegir un alumne
```graphql
mutation {
  afegirAlumne(nom:"PERE") {
    codi
    nom
  }
}
```

### Mutation - Modificar un alumne
```graphql
mutation {
  modificarAlumne(codi:"3", nom:"MARIA") {
    codi
    nom
  }
}
```

### Mutation - Esborrar un alumne
```graphql
mutation {
  esborrarAlumne(codi:"1")
}
```

## 🔧 Provar amb curl

```bash
# Obtenir tots els alumnes
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ obtenirAlumnes { codi nom } }"}'

# Afegir un alumne
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { afegirAlumne(nom:\"PERE\") { codi nom } }"}'
```

## 🔧 Provar amb Postman

1. Crea una nova Request de tipus `POST`
2. URL: `http://localhost:4000/graphql`
3. Headers: `Content-Type: application/json`
4. Body (raw, JSON):
```json
{
  "query": "{ obtenirAlumnes { codi nom } }"
}
```

O utilitza la pestanya GraphQL de Postman:
- Selecciona `GraphQL` com a tipus de body
- Escriu la consulta directament sense JSON wrapper

## 📚 Tecnologies utilitzades

- **Express**: Framework web per a Node.js
- **GraphQL**: Llenguatge de consulta per a APIs
- **graphql-http**: Implementació de GraphQL sobre HTTP
- **Node.js**: Entorn d'execució JavaScript

## ⚠️ Nota important

Aquest servidor utilitza `graphql-http` que **no inclou GraphiQL integrat**. Per explorar l'API amb una interfície gràfica, utilitza:
- Postman (amb suport GraphQL)
- Insomnia
- Altair GraphQL Client
- GraphQL Playground (app independent)

## 👨‍💻 Autor

sergi.grau@fje.edu - Desembre 2025
