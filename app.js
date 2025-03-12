// importo express 
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// importo il file delle rotte
const moviesRouter = require('./routers/movieRouter');

// importo middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");

// importo il middleware di gestione errore 404
const notFound = require("./middlewares/notFound");

// importo il middleware di gestione path imgs
const imagePathMiddleware = require('./middlewares/imagePath');

// middleware file statici cartella public
app.use(express.static('public'));

// registro il middleware di path imgs
app.use(imagePathMiddleware);

// middleware CORS
app.use(cors({ origin: process.env.FE_APP }));

// registro il body-parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server della mia webapp di films")
})

// richiamo il file delle rotte
app.use("/api/movies", moviesRouter)

// utilizzo middleware di gestione errore server
app.use(errorsHandler);

// utilizzo middleware di gestione not found 404
app.use(notFound);

app.listen(port, () => {
    console.log(`Esempio di applicazione in ascolto sulla porta ${port}`)
})