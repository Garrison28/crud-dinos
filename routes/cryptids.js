const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    res.render('cryptids/index', {crypts: cryptData});
});

router.post('/', function(req, res) {
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    cryptData.push(req.body);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect('/cryptids');
});

router.get('/edit/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    res.render('cryptids/edit', {crypt: cryptData[index], cryptIndex: index})
});

router.put('/:id', function (req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    cryptData[index] = req.body;
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect(`/cryptids/${index}`);
});

router.delete('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    cryptData.splice(index, 1);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect('/cryptids');
});


router.get('/new', function(req, res) {
    res.render('cryptids/new');
});

router.get('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    res.render('cryptids/show', {crypt: cryptData[index]});
});

module.exports = router;