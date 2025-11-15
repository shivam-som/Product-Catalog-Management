const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        tableName: 'categories',
        timestamps: true
    });
    return Category;
};