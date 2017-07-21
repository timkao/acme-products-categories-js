const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const db = require('./db.js');
const bodyParser = require('body-parser');
const router = require('./routes/categories.js')
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;
nunjucks.configure('views', {noCache: true});
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html')
app.engine('html', nunjucks.render);

app.get('/', function(req, res){
  var categories = db.getCategoryNames();
  res.render('index', {categories: categories});
});

app.use('/categories', router);
app.use(function(err, req, res, next){
  res.render('error', {error: err});
});

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});

