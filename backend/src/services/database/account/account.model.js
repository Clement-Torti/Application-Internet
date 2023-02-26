/* eslint-disable no-console */

module.exports = async function(app, tableName) {
    try {
       const db = app.get('knexClient')
       
       await db.schema.createTable(tableName, table => {
          table.increments('id').primary()
          table.string('mail').unique().notNull()
          table.string('password').notNull()
          table.string('name').notNull()
          table.string('firstname').notNull()
          table.decimal('account_balance',12,2).defaultTo(0.00).notNull()
       })
       console.log(`Created ${tableName} table`)
    } catch(err) {
       console.log(`Error creating ${tableName} table: ${err.toString()}`)
    }
 }
 