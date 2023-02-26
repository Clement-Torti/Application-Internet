/* eslint-disable no-console */

module.exports = async function(app, tableName) {
    try {
       const db = app.get('knexClient')
       
       await db.schema.createTable(tableName, table => {
          table.increments('id').primary()
          table.text('label').notNull()
       })
       console.log(`Created ${tableName} table`)
    } catch(err) {
       console.log(`Error creating ${tableName} table: ${err.toString()}`)
    }
 }
 