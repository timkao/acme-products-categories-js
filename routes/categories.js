const express = require('express');
const db = require('../db.js');

var router =  express.Router();

router.post('/', function(req, res){
  db.createCategory(req.body.newCat);
  res.redirect('/');
});

router.get('/:name/products', function(req, res){
  var categories = db.getCategoryNames();
  var products = db.getProductsByCategory(req.params.name);
  res.render('products', {
    categories: categories,
    products: products,
    current: req.params.name
  });
});

router.post('/:name/products', function(req, res){
  db.createProduct(req.params.name, req.body.newProduct);
  res.redirect('./products');
});

router.delete('/:name/products/:id', function(req, res){
  db.deleteProduct(req.params.name, req.params.id * 1);
  res.redirect('./')
});

router.post('/:name/products/:id', function(req, res){
  db.updateProduct(req.params.name, req.params.id * 1);
  res.redirect('./')
});

router.delete('/:name', function(req, res){
  db.deleteCategory(req.params.name);
  res.redirect('/');
});

module.exports = router;
