const User = require('../../models/users.js');

const GetDetailsController = async (request, h) => {
    try{
        //Find User
        const isUserExist = await User.query()
            .select('fullname','roles','email', 'id')
            .where('id', '=', request.auth.credentials.id)

        //If No User Found
        if(isUserExist.length === 0){
            const responsData = {
                errorType:'User Not Found',
                location:"GetDetailsController api",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        const responsData = {
            data:isUserExist[0],
            message: 'User details fetched successfully'
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
            location:"GetDetailsController api",
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

module.exports = GetDetailsController;