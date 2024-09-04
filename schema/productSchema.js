import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
// import Category from './categorySchema.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    short_description: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    long_description: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    regular_price: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    sale_price: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    sku_code: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    stock_status: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    stock_qty: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    tax_category: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    delivery_charges: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    prod_attribute: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    product_single_image: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    product_multiple_image: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

// Define the relationship
// Product.belongsTo(Category);
// Category.hasMany(Product);

export default Product;
