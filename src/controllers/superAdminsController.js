const { isSuperAdmin } = require('../middleware/authorization');

module.exports = {
    'superAdmins' : (req, h) => {
        const response = isSuperAdmin(req, h)
        if(response){
            return response
        }
        return 'super admin Request, You are authorized';
    }
}