// autor: sergi.grau@fje.edu
// data: 04.12.25
// versió: 1.0

/**
 * Mòdul de base de dades en memòria per a gestió d'Alumnes
 * En un entorn de producció, aquí es connectaria a MongoDB, PostgreSQL, etc.
 */

// Base de dades falsa en memòria (Array d'alumnes)
const alumnes = [
    { codi: '1', nom: 'SERGI' },
    { codi: '2', nom: 'ANNA' },
    { codi: '3', nom: 'JOAN' }
];

/**
 * Funció per obtenir la "connexió" a la base de dades
 * En aquest cas retorna directament l'array d'alumnes
 * @returns {Array} Array d'alumnes
 */
function getDB() {
    return alumnes;
}

/**
 * Classe que representa un Alumne
 */
class Alumne {
    constructor(codi, nom) {
        this.codi = codi;
        this.nom = nom;
    }
}

// Exportar les funcions i la classe
module.exports = { getDB, Alumne };
