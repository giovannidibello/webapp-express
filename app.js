// importo express 
const express = require('express');
const app = express();
const port = 3000;
// const cors = require("cors");

// importo il file delle rotte
const moviesRouter = require('./routers/movieRouter');

// importo il middleware di gestione path imgs
const imagePathMiddleware = require('./middlewares/imagePath');

// middleware file statici cartella public
app.use(express.static('public'));

// registro il middleware di path imgs
app.use(imagePathMiddleware);

// middleware CORS
// app.use(cors());

// registro il body-parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server della mia webapp di films")
})

// richiamo il file delle rotte
app.use("/api/movies", moviesRouter)

app.listen(port, () => {
    console.log(`Esempio di applicazione in ascolto sulla porta ${port}`)
})