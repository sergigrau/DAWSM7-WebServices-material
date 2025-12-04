// autor: sergi.grau@fje.edu
// data: 04.12.25
// versió: 1.0

const { getDB, Alumne } = require('./db');

/**
 * Crea i retorna els resolvers per a les operacions GraphQL
 * Els resolvers són funcions que s'executen quan es fa una consulta o mutació
 * @returns {Object} Objecte amb totes les funcions resolver
 */
function createResolvers() {
    // Obtenir l'array d'alumnes de la "base de dades"
    const alumnes = getDB();
    
    return {
        // ========== QUERIES ==========
        
        /**
         * Query: Obté tots els alumnes
         * Exemple: { obtenirAlumnes { codi nom } }
         * @returns {Array} Llista completa d'alumnes
         */
        obtenirAlumnes() {
            return alumnes;
        },
        
        /**
         * Query: Obté un alumne específic per codi
         * Exemple: { obtenirAlumne(codi:"2") { codi nom } }
         * @param {Object} params - Paràmetres de la consulta
         * @param {string} params.codi - Codi de l'alumne a cercar
         * @returns {Object} Alumne trobat
         * @throws {Error} Si no es troba l'alumne
         */
        obtenirAlumne({ codi }) {
            const alumne = alumnes.find(a => a.codi == codi);
            if (!alumne) {
                throw new Error('Cap alumne amb codi ' + codi);
            }
            return alumne;
        },
        
        // ========== MUTATIONS ==========
        
        /**
         * Mutation: Afegeix un nou alumne amb un codi aleatori
         * Exemple: mutation { afegirAlumne(nom:"PERE") { codi nom } }
         * @param {Object} params - Paràmetres de la mutació
         * @param {string} params.nom - Nom del nou alumne
         * @returns {Object} L'alumne creat
         */
        afegirAlumne({ nom }) {
            // Genera un codi aleatori únic de 20 caràcters hexadecimals
            const codi = require('crypto').randomBytes(10).toString('hex');
            const alumne = new Alumne(codi, nom);
            alumnes.push(alumne);
            return alumne;
        },
        
        /**
         * Mutation: Modifica el nom d'un alumne existent
         * Exemple: mutation { modificarAlumne(codi:"3", nom:"sergi") { codi nom } }
         * @param {Object} params - Paràmetres de la mutació
         * @param {string} params.codi - Codi de l'alumne a modificar
         * @param {string} params.nom - Nou nom de l'alumne
         * @returns {Object} L'alumne modificat
         */
        modificarAlumne({ codi, nom }) {
            const alumne = alumnes.find(a => a.codi == codi);
            if (!alumne) {
                throw new Error('Cap alumne amb codi ' + codi);
            }
            alumne.nom = nom;
            return alumne;
        },
        
        /**
         * Mutation: Esborra un alumne per codi
         * Exemple: mutation { esborrarAlumne(codi:"1") }
         * @param {Object} params - Paràmetres de la mutació
         * @param {string} params.codi - Codi de l'alumne a esborrar
         * @returns {number|null} Nombre d'alumnes restants o null si no es troba
         */
        esborrarAlumne({ codi }) {
            const alumne = alumnes.find(a => a.codi === codi);
            if (!alumne) {
                throw new Error('Cap alumne amb codi ' + codi);
            }
            const index = alumnes.indexOf(alumne);
            alumnes.splice(index, 1);
            return alumnes.length; // Retorna el nombre d'alumnes restants
        }
    };
}

// Exportar la funció de creació de resolvers
module.exports = { createResolvers };
