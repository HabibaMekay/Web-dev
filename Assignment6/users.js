const jwt = require('jsonwebtoken');

const users = [];

async function CreateUser({ username, email, password, role = 'user' }) {
    const user = {
        id: users.length + 1,
        username,
        email,
        password,
        role
    }

    if(ValidateEmail(email) && ValidatePassword(password)){
        users.push(user);
        return user;
    }
    else{
        throw new Error('Recheck your email or password');
    }
}

async function GetAllUsers() {
    return users;
}   

async function GetUserById(id) {
    return users.find(user => user.id === id);
}

async function UpdateUser(id, { username, email, password, role }) {
    const user = users.find(user => user.id === id);
}


function ValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function ValidatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //bel order da: one number, one special characterat least 8 characters
    return passwordRegex.test(password);
}

async function LoginUser(username, password){
    console.log('Login attempt:', { username, password });
    const user = users.find(user => user.username === username && user.password === password);
    if(user){

        const accessToken = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
        
          const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
          );
        
        
         return { "accessToken" : accessToken, "refreshToken" : refreshToken };

    }
    else{
        throw new Error('Invalid username or password');
    }

}

module.exports = { CreateUser, GetAllUsers, GetUserById, UpdateUser, LoginUser };

