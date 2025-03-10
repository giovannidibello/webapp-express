function setImagePath(req, res, next) {

    // creo il path assoluto della img
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies_cover/`;
    next()

}

module.exports = setImagePath;