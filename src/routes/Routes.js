const testingController = require('../controllers/testingController.js');
const adminController  = require('../controllers/adminsController');
const superAdminController = require('../controllers/superAdminsController');

module.exports = function(){
    return [
        {
            method: 'GET',
            path: '/',
            options:{
                auth:'jwt',
                handler : testingController.getTesting,
            }
        },
        {
            method: 'GET',
            path: '/v1/api/admin',
            options:{
                auth:'jwt',
                handler : adminController.adminsController,
            }
        },
        {
            method: 'GET',
            path: '/v1/api/super-admin',
            options:{
                auth:'jwt',
                handler : superAdminController.superAdmins,
            }
        }
    ]
}