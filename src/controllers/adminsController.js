const { isAdmin } = require('../middleware/authorization');

module.exports = {
    'adminsController' : (req, h) => {
        const response = isAdmin(req, h)
        if(response){
            return response
        }
        return 'Admins Request, You are authorized';
    }
}