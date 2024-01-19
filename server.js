const { Sequelize, DataTypes } = require("sequelize")

const getConnectionString = () => {
    const host = process.env.POSTGRES_HOST || "localhost"
    const db = process.env.POSTGRES_DB || "heroes"
    const password = process.env.POSTGRES_PASSWORD || "mysecretpassword"
    const port = parseInt(process.env.POSTGRES_PORT || "5432")
    return `postgres://postgres:${password}@${host}:${port}/${db}`
}

async function getDB() {
    const sequelize = new Sequelize(
        getConnectionString(),
        {
            logging: false,
            native: false
        }
    );

    await sequelize.authenticate();
    console.log("postgres is running");

    const Hero = sequelize.define("hero", {
        name: DataTypes.STRING,
        power: DataTypes.STRING,
    });

    await Hero.sync({force: true});

    return {
        Hero,
        sequelize
    }
}