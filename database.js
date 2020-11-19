const Sequelize = require('sequelize');

var db={}

// config connection DB
const sequelize = new Sequelize( 
    process.env.DB_NAME,  
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port:  process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        operatorsAliases: false,
    })

let models = [
    // require('./models/products.js'),
    require('./models/categories.js'),
    require('./models/subCategories.js'),
    require('./models/subsubCategories.js')
]

  // Khởi tạo models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

db.categories.hasMany(db.sub_categories,{foreignKey: 'category_id'})

  // Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})


db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db