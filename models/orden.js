const Orden = db.define("orden", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.FLOAT
    },
    libras: {
        type: Sequelize.FLOAT
    }
}
