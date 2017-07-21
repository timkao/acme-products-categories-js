let data = {
  'Foo Category': [
    {
      name: 'foo 1',
      price: 20,
      id: 1,
    },
    {
      name: 'foo 2',
      price: 13,
      id: 2
    }
  ],
  'Bar Category': [
    {
      name: 'bar 1',
      price: 22,
      id: 1
    },
    {
      name: 'bar 2',
      price: 19,
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
  if (newProduct === '') {
    throw new Error('Please key in Product Name!')
  }

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
  data[cat].push({name: newProduct, id: newId, price: Math.round(100 * Math.random())})
}

function deleteProduct(cat, droppedId) {
  data[cat] = getProductsByCategory(cat).filter(function(product){
    return product.id !== droppedId;
  });
}

function updateProduct(cat, targetId) {
  getProductsByCategory(cat).forEach(function(product){
    if (product.id === targetId) {
      product.price = Math.round(100 * Math.random());
    }
  });
}

function deleteCategory(cat) {
  delete data[cat];
}

function createCategory(str) {

  if (str === '') {
    throw new Error('Please key in Category Name!')
  }

  var cat = str + ' Category';

  if (getCategoryNames().includes(cat)){
    throw new Error('The Category already exist!')
  }

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
