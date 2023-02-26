/* eslint-disable no-console */

module.exports = async function(app, tableName) {
    try {
       const db = app.get('knexClient')
       
       await db.schema.createTable(tableName, table => {
         table.increments('id').primary()
         table.decimal('price',12,2).notNull()
         table.text('description').notNull()
         table.string('label').notNull()
         table.integer('id_owner').references('account.id').notNull()
         table.integer('id_buyer').references('account.id')
       })
       console.log(`Created ${tableName} table`)
    } catch(err) {
       console.log(`Error creating ${tableName} table: ${err.toString()}`)
    }
 }
 