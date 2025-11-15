const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: { type: DataTypes.STRING, allowNull: false }
    }, {
        tableName: 'users',
        timestamps: true
    });
    return User;
};