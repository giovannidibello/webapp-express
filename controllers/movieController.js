// importo il file di connessione al database
const connection = require('../data/db');

// index
function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // versione mappata del risultato per le immagini

        const movies = results.map(movie => {

            return {
                ...movie,
                image: req.imagePath + movie.image
            }


        })
        res.json(movies);
    });
}

// show
function show(req, res) {

    // recupero l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // preparo la query per il film
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // preparo la query per le rewiews
    const reviewsSql = `
    SELECT *
    FROM reviews    
    WHERE movie_id = ?
    `;

    // query per il film
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // recupero il film
        const movie = movieResults[0];

        // aggiungo l'immagine al film
        movie.image = req.imagePath + movie.image

        // se è andata bene, eseguiamo la seconda query per le reviews
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiungo le reviews al film
            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });

}

// store movie
function store(req, res, next) {

    const { title, director, genre, release_year, abstract } = req.body;

    // gestisco il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creo la query di insert
    const query = "INSERT INTO movies (title, director, genre, release_year, image, abstract) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(query,
        [title, director, genre, release_year, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Film creato con successo!",
            });
        })
}

// store review
function storeReview(req, res) {

    // id preso dai parametri
    const { id } = req.params;

    // le altre info dal body
    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    // eseguo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });

    });

}

// update
function update(req, res) {


}

// modify
function modify(req, res) {

}

// destroy
function destroy(req, res) {



}

// esporto tutto
module.exports = { index, show, store, storeReview, update, modify, destroy }