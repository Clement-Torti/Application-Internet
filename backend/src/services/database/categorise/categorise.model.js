/* eslint-disable no-console */

module.exports = async function(app, tableName) {
    try {
       const db = app.get('knexClient')
       
       await db.schema.createTable(tableName, table => {
         table.increments('id').primary()
         table.integer('id_category').references('category.id').notNull()
         table.integer('id_product').references('product.id').notNull()
         table.unique(['id_category', 'id_product'])
       })
       console.log(`Created ${tableName} table`)
    } catch(err) {
       console.log(`Error creating ${tableName} table: ${err.toString()}`)
    }
 }
 