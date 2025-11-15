const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING },
        price: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    }, {
        tableName: 'products',
        timestamps: true
    });
    return Product;
};