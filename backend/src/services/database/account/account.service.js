
const service = require('feathers-knex');

module.exports = function(app) {
   const db = app.get('knexClient')
   let name = 'account'

   app.use(name, service({
      Model: db,
      name,
      idField:'id_account',
      paginate: false,
   }))
   
}
