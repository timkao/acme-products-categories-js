let data = {
  'Foo Category': [
    {
      name: 'foo 1',
      id: 1,
    },
    {
      name: 'foo 2',
      id: 2
    }
  ],
  'Bar Category': [
    {
      name: 'bar 1',
      id: 1
    },
    {
      name: 'bar 2',
      id: 2
    }
  ]
};

function getCategoryNames() {
  return Object.keys(data);
}

function getProductsByCategory(cat) {
  return data[cat];
}

function createProduct(cat, newProduct) {

  var idArr = [];
  // check if the product already exist and check which id is used
  getProductsByCategory(cat).forEach(function(product){
    // why product[name] does not work?
    if (product.name === newProduct) {
      throw new Error('The product already exist!')
    }
    idArr.push(product.id)
  });
  var newId = 1;
  while (idArr.includes(newId)) {
    newId += 1;
  }
  data[cat].push({name: newProduct, id: newId})
}

function deleteProduct(cat, droppedId) {
  data[cat] = getProductsByCategory(cat).filter(function(product){
    return product.id !== droppedId;
  });
}

function updateProduct(cat, target, newPrice) {
  getProductsByCategory(cat).forEach(function(product){
    product.price = newPrice;
  });
}

function deleteCategory(cat) {
  delete data[cat];
}

function createCategory(str) {
  var cat = str + ' Category';
  data[cat] = [];
}

module.exports = {
  getCategoryNames: getCategoryNames,
  getProductsByCategory: getProductsByCategory,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  deleteCategory: deleteCategory,
  createCategory: createCategory
};
