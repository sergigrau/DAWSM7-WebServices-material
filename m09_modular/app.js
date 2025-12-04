// autor: sergi.grau@fje.edu
// data: 04.12.25
// versió: 1.0

/**
 * 
 * 
 * Exemples de consultes:
 * 
 * Query - Obtenir tots els alumnes:
 *   { obtenirAlumnes { codi nom } }
 * 
 * Query - Obtenir un alumne:
 *   { obtenirAlumne(codi:"2") { codi nom } }
 * 
 * Mutation - Afegir alumne:
 *   mutation { afegirAlumne(nom:"PERE") { codi nom } }
 * 
 * Mutation - Modificar alumne:
 *   mutation { modificarAlumne(codi:"3", nom:"sergi") { codi nom } }
 * 
 * Mutation - Esborrar alumne:
 *   mutation { esborrarAlumne(codi:"1") }
 */

const express = require('express');
// Express: framework per crear servidor HTTP i gestionar rutes
const { createHandler } = require('graphql-http/lib/use/express');
// createHandler: integra `graphql-http` amb Express per gestionar l'endpoint `/graphql`
const { buildSchema } = require('graphql');
// buildSchema: construeix l'esquema GraphQL des d'una cadena SDL
const fs = require('fs');
const path = require('path');
// fs i path: mòduls de Node.js per llegir fitxers del sistema
const { createResolvers } = require('./resolvers');
// createResolvers: funció que crea tots els resolvers per a les operacions GraphQL

/**
 * Funció principal per inicialitzar l'aplicació
 */
async function initializeApp() {
    try {
        // Llegir l'esquema GraphQL des del fitxer schema.graphql
        const schemaString = fs.readFileSync(
            path.join(__dirname, 'schema.graphql'), 
            'utf8'
        );
        
        // Construir l'esquema a partir de la cadena llegida
        const esquema = buildSchema(schemaString);
        
        // Crear els resolvers (funcions que gestionen les queries i mutations)
        const arrel = createResolvers();
        
        // Crear l'aplicació Express
        const app = express();
        
        // Configurar l'endpoint GraphQL amb graphql-http
        // Aquest handler processa totes les peticions POST a /graphql
        app.use('/graphql', createHandler({
            schema: esquema,
            rootValue: arrel,
        }));
        
        // Ruta principal que mostra informació sobre l'API
        app.get('/', (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html lang="ca">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>API GraphQL - Alumnes</title>
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                            margin: 0; 
                            padding: 20px;
                            background: #f5f5f5;
                        }
                        .container {
                            max-width: 800px;
                            margin: 0 auto;
                            background: white;
                            padding: 30px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        h1 { color: #333; margin-top: 0; }
                        h2 { color: #666; margin-top: 30px; }
                        pre { 
                            background: #f4f4f4; 
                            padding: 15px; 
                            border-radius: 5px;
                            overflow-x: auto;
                        }
                        a { color: #0074D9; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                        .note { 
                            background: #fff3cd; 
                            padding: 15px; 
                            border-left: 4px solid #ffc107;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🎓 API GraphQL - Gestió d'Alumnes</h1>
                        <p>El teu endpoint GraphQL està disponible a: <a href="/graphql">/graphql</a></p>
                        
                        <div class="note">
                            <strong>Nota:</strong> Aquest servidor utilitza <code>graphql-http</code> i no inclou GraphiQL integrat. 
                            Utilitza Postman, Insomnia, Altair o curl per interactuar amb l'API.
                        </div>
                        
                        <h2>Exemples de consultes</h2>
                        
                        <h3>Query - Obtenir tots els alumnes:</h3>
                        <pre>{
  obtenirAlumnes {
    codi
    nom
  }
}</pre>
                        
                        <h3>Query - Obtenir un alumne específic:</h3>
                        <pre>{
  obtenirAlumne(codi:"2") {
    codi
    nom
  }
}</pre>
                        
                        <h3>Mutation - Afegir un alumne:</h3>
                        <pre>mutation {
  afegirAlumne(nom:"PERE") {
    codi
    nom
  }
}</pre>
                        
                        <h3>Mutation - Modificar un alumne:</h3>
                        <pre>mutation {
  modificarAlumne(codi:"3", nom:"MARIA") {
    codi
    nom
  }
}</pre>
                        
                        <h3>Mutation - Esborrar un alumne:</h3>
                        <pre>mutation {
  esborrarAlumne(codi:"1")
}</pre>
                        
                        <h2>Exemple amb curl</h2>
                        <pre>curl -X POST http://localhost:4000/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query":"{ obtenirAlumnes { codi nom } }"}'</pre>
                    </div>
                </body>
                </html>
            `);
        });
        
        // Definir el port del servidor
        const PORT = process.env.PORT || 4000;
        
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor GraphQL API executant-se a http://localhost:${PORT}/graphql`);
            console.log(`Informació de l'API disponible a http://localhost:${PORT}/`);
        });
        
    } catch (error) {
        console.error('Error en inicialitzar l\'aplicació:', error);
        process.exit(1);
    }
}

// Executar l'aplicació
initializeApp();
