//Controllers
const RegisterController = require('../../controllers/AuthenticationControllers/Register');
const LoginController = require('../../controllers/AuthenticationControllers/Login.js');
const GetDetailsController = require('../../controllers/AuthenticationControllers/GetDetailsController');

//Validators
const RegisterValidation = require('../../validators/RegisterValidations.js')
const LoginValidation = require('../../validators/LoginValidations.js');

const AuthorizationRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/register',
            options:{
                auth:false,
                handler : RegisterController,
                validate: {
                    payload: RegisterValidation
                }
            },
        },
        {
            method: 'post',
            path: '/v1/api/login',
            options:{
                auth:false,
                handler : LoginController,
                validate:{
                    payload: LoginValidation
                }
            },
        },
        {
            method: 'get',
            path: '/v1/api/user',
            options:{
                auth:'jwt',
                handler : GetDetailsController,
            },
        }
    ]
}

module.exports = AuthorizationRoutes;