const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
    res.render('home');
});

app.use('/cryptids', require('./routes/cryptids'));
app.use('/dinosaurs', require('./routes/dinosaurs'));

app.listen(3000, function() {
    console.log('server is up')
});