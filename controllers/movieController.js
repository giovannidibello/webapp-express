// importo il file di connessione al database
const connection = require('../data/db');

// index
function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// show
function show(req, res) {


}

// store
function store(req, res) {


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
module.exports = { index, show, store, update, modify, destroy }