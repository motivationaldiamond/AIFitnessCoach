//authService.js

const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming User is a Mongoose model

class AuthService {
    async register(user) {
        // Encrypt the user's password
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = encryptedPassword;
        user.enabled = true;
        user.role = 'standard';
        
        // Save to DB
        const savedUser = await User.create(user);
        return savedUser; // return user
    }

    async getUserByUsername(username) {
        const user = await User.findOne({ username });
        return user;
    }
}

module.exports = new AuthService();
