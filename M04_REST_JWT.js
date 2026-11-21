/**
 * @version 3.0 21.11.26
 */
// npm install jsonwebtoken
/* {
  "nom": "sergi",
  "password": "1234",
}
*/
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body


const PORT = 8888;

const usuaris = [
    { id: 1, nom: "Sergi", password: "1234" },
    { id: 2, nom: "Joan", password: "5678" }
];

app.get('/hora', (req, res) => {
    const hora = (new Date()).toLocaleTimeString();
    res.status(200).send(`La hora és ${hora}`);
});

app.get("/{*splat}", (req, res) => {
    res.sendStatus(404);
});

app.post("/login", (req, res) => {
    if (!req.body.nom || !req.body.password) {
        res.status(400).send("Error");
        return;
    }
    const usuari = usuaris.find((u) => {
        return u.nom === req.body.nom && u.password === req.body.password;
    });

    const token = jwt.sign({
        sub: usuari.id,
        usuari: usuari.nom
    }, "clau", { expiresIn: "3 hours" });
    res.status(200).send({ access_token: token })
});


app.post('/verifica', (req, res) => {
    console.log(req.body.access_token);
    try {
        let u = jwt.verify(req.body.access_token, 'clau');
        console.log(u);
        res.status(200).send(`ok ${u.usuari}`);

      } catch(err) {
        res.status(400).send("Error");

      }

      
});

app.listen(PORT, () => {
    console.log(`Servidor execuntant-se en el port ${PORT}.`);
});