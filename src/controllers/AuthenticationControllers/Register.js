const User = require('../../models/users.js');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Register = async (request, h) => {
    try{
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            role 
        } = request.payload;

        const isUserExist = await User.query()
            .select('fullname')
            .where('email', '=', email)

        if(isUserExist.length !== 0){
            const responsData = {
                errorType:'User Already Exist',
                location:"Register api",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        const hashedPass = await argon2.hash(password);
       
        const user = await User.query().insert({
            firstName:firstName,
            lastName:lastName,
            password:hashedPass,
            email:email,
            roles : role,
            fullname: firstName + " " + lastName
        });

        const payload = {
            id: user.id,
            role: user.roles
        }

        const token = await jwt.sign(
            payload, process.env.JWT_TOKEN,{
            expiresIn: 60*60*24*7
        });

        const responsData = {
            data:{
                authToken: token
            },
            message: 'User Successfully Registered'
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(200)
        return response

    } catch (error) {
        const responsData = {
            errorType:'TryCatch',
            location:"Register api",
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

module.exports = Register;