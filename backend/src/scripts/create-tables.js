
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')

const knex = require('../knex')

const createCategoryTable = require('../services/database/category/category.model')
const createAccountTable = require('../services/database/account/account.model')
const createProductTable = require('../services/database/product/product.model')
const createCategoriseTable = require('../services/database/categorise/categorise.model')


async function main() {
   const app = feathers()

   app.configure(configuration())
   app.configure(knex)

   // database   
   await createCategoryTable(app, "category")
   await createAccountTable(app, "account")
   await createProductTable(app, "product") 
   await createCategoriseTable(app, "categorise")

   process.exit(0)
}

main()
