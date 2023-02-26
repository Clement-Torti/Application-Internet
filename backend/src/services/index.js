
// database
const categoryService = require('./database/category/category.service.js')
const accountService = require('./database/account/account.service.js')
const productService = require('./database/product/product.service.js')
const categoriseService = require('./database/categorise/categorise.service.js')

// custom
// ...

module.exports = function (app) {

   // database
   app.configure(categoryService)
   app.configure(accountService)
   app.configure(productService)
   app.configure(categoriseService)

   

   // custom
   // ...
}
