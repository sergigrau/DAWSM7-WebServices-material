/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 3.0 21.11.26
 */

const express = require('express');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

let alumnes = [
    {codi:1, nom:'SERGI'},
    {codi:2, nom:'ANNA'},
    {codi:3, nom:'JOAN'}
];
app.get('/', (req, res)=>res.send('hola'));

app.get('/api/alumnes', (req, res)=>res.send(alumnes));
app.get('/api/alumnes/:codi', (req, res)=>{
    let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    if (!alumne) return res.sendStatus(404);
    res.send(alumne);
});
app.post('/api/alumnes', (req, res)=>{
    console.log('req.body.codi');
    let alumne={codi: req.body.codi, nom: req.body.nom };
    alumnes.push(alumne);
    res.send(alumnes);
});
app.delete('/api/alumnes/:codi', (req, res)=>{
    var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    var index =alumnes.indexOf(alumne);
    alumnes.splice(index, 1);
    res.send();
});
app.put('/api/alumnes/:codi', (req, res)=>{
 let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    alumne.codi = parseInt(req.body.codi);
    alumne.nom = req.body.nom;
    res.send('modificat');

});

app.listen(3000, ()=>console.log('inici servidor'));
