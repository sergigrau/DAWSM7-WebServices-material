/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 3.0 21.11.26
 */


const express = require('express');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body


let productes = [
    {cat:'ORD', nom:'ASUS', preu:1000},
    {cat:'ORD', nom:'MSI', preu:1200},
    {cat:'RAT', nom:'MS', preu:25},
    {cat:'RAT', nom:'LG', preu:45}
];

app.get('/api/productes', (req, res)=>res.send(productes));

app.get('/api/productes/:cat', (req, res)=>{
    let ps=[];
    productes.forEach(function(p){
        if (p.cat===req.params.cat) ps.push(p);
    });
    if (ps.length === 0) return res.sendStatus(404);
    res.send(ps);
});

app.get('/api/productes/:cat/:nom', (req, res)=>{
    let producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    if (!producte) return res.sendStatus(404);
    res.send(producte);
});

app.post('/api/productes', (req, res)=>{
    let producte={'cat': req.body.cat, 'nom': req.body.nom, 'preu':parseInt(req.body.preu)};
    productes.push(producte);
    res.send(producte);
});
app.delete('/api/productes/:cat', (req, res)=>{
    productes.forEach(function(p, index){
        if (p.cat===req.params.cat)   productes.splice(index, 1);
        index--;

    });   
    res.send(productes);
});
app.delete('/api/productes/:cat/:nom', (req, res)=>{
    let producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    let index =productes.indexOf(producte);
    productes.splice(index, 1);
    res.send(productes);
});
app.put('/api/productes/:cat/:nom', (req, res)=>{
    let nouProducte={cat: req.body.cat, 'nom': req.body.nom , 'preu': parseInt(req.body.preu)};
    let producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    let index =productes.indexOf(producte);
    productes[index]=nouProducte;
});

app.listen(3000, ()=>console.log('inici servidor'));