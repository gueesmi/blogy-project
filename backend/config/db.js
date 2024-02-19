const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Database connected successfuly :)")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = dbConnection