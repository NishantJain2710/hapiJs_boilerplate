const User = require('../../models/users.js');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const Login = async (request, h) => {
    try{
        const { 
            email, 
            password
        } = request.payload;

        //Find User
        const isUserExist = await User.query()
            .select('fullname','roles','email', 'id', 'password')
            .where('email', '=', email)

        //If No User Found
        if(isUserExist.length === 0){
            const responsData = {
                errorType:'User Not Found',
                location:"Login api",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        //Verify User Password
        const verifyPassword = await argon2.verify(isUserExist[0].password, password);
        if(!verifyPassword){
            const responsData = {
                errorType:'Incorrect Password',
                location:"Login api",
                message:'Oops! Incorrect password try again!'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        const payload = {
            id:     isUserExist[0].id,
            role:   isUserExist[0].roles
        }

        const token = await jwt.sign(
            payload, process.env.JWT_TOKEN, {
              expiresIn: 60*60*24*7
            }
        );

        const responsData = {
            data:{
                authToken: token
            },
            message: 'User Successfully Logged In'
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(200)
        return response

    }catch(error){
        const responsData = {
            errorType:'TryCatch',
            location:"Login api",
            message:error.message
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(500)
        return response
    }
}

module.exports = Login;