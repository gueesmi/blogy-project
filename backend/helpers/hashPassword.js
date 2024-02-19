const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error.message)
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const validation = await bcrypt.compare(password, hashedPassword);
        return validation
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { hashPassword, comparePassword }