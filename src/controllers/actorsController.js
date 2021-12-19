const db = require('../database/models');
const sequelize = db.sequelize;

const actorsController = {
    list: function (req, res) {
        db.Actor.findAll({
            order: [
                ['first_name', 'ASC']
            ]
        })
        .then(actor => {
            res.render('actorsList', {actor})
        })
    },

    detail: function(req, res) {
        let pedidoActor = db.Actor.findByPk(req.params.id);
        let pedidoMovie = db.Movie.findAll();

        Promise.all([pedidoActor, pedidoMovie])
        .then(([actor, movies]) => {
            res.render('actorsDetail', {actor, movies})
        })
    },

    add: function(req, res) {
        db.Movie.findAll()
        .then(AllMovies => {
            res.render('actorsAdd', {AllMovies});
        })
    },

    create: function(req, res) {
        db.Actor.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id,
        })

        res.redirect('/actors');
    },

    edit: function(req, res) {
        let pedidoActor = db.Actor.findByPk(req.params.id);
        let pedidoMovie = db.Movie.findAll();

        Promise.all([pedidoActor, pedidoMovie])
        .then(([actor, movies]) => {
            res.render('actorsEdit', {actor, movies})
        })
    },

    update: function(req, res) {
        db.Actor.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id,
        }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect('/actors/detail/' + req.params.id);
    },
    
    delete: function(req, res) {
        db.Actor.findByPk(req.params.id)
        .then(actor => {
            res.render('actorsDelete', {actor});
        })
    },

    destroy: function(req, res) {
        db.Actor.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect('/actors');
    }
}

module.exports = actorsController;