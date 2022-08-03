const Hapi = require('@hapi/hapi');
const Routes = require('./routes/Routes.js');
const db = require('./database/db_setup');
const laabr = require('laabr');

const { validate } = require('./utils/auth.js');

require('dotenv').config();

db();

//Routes 
const AuthorizationRoutes = require('./routes/AuthorizationRoutes/AuthorizationRoute.js');

const init = async() => {
    try{
        const server = new Hapi.Server({
            port:process.env.PORT,
            host:process.env.HOST,
            routes: { cors: { origin: ['*'] } }
        })

        await server.register([
            require('hapi-auth-jwt2'),
            {
                plugin: laabr,
                options: {
                    formats: { onPostStart: ':time :start :level :message' },
                    tokens: { start:  () => '[start]' },
                    indent: 0
                },
            }
        ]);
        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_TOKEN,
            validate,
            verifyOptions: {
                algorithms: ['HS256'],
            }
        })
        server.auth.default('jwt');

        server.route(Routes());
        server.route(AuthorizationRoutes());
    
        await server.start();

        console.log('info', 'server running at: ' + server.info.uri)
    }catch(error){
        console.log(error)
    }
}

init();