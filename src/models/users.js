const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get firstNameColumn() {
        return 'firstName';
    }

    static get lastNameColumn() {
        return 'lastName';
    }

    static get fullnameColumn() {
        return 'fullname'
    }

    static get emailColumn() {
        return 'email';
    }

    static get passwordColumn() {
        return 'password';
    }

    static get roleColumn() {
        return 'roles';
    }

    $beforeInsert() {
        this.createdAt = new Date();
    }
    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get jsonSchema() {
        return {
            type : 'object',
            required : ['firstName', 'lastName', 'email', 'password'],
            properties : {
                id : { type:'integer' },
                firstName : { type : 'string', minLength : 1, maxLength : 126},
                lastName : { type : 'string', minLength : 1, maxLength : 126},
                fullname: {type:'string', default: "" },
                password : { type: 'string' },
                email : { type : 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                roles : {
                    type : 'string',
                    enum: ['user', 'admin', 'superAdmin'],
                    default: 'user'
                }
            }
        }
    }
}

module.exports = User;