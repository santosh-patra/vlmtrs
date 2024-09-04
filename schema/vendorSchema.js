import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Vendor = sequelize.define('Vendor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendor_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    batch_no: {
        type: DataTypes.STRING,
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

}, {
    hooks: {
        beforeCreate: async (vendor, options) => {
            const latestVendor = await Vendor.findOne({
                order: [['createdAt', 'DESC']]
            });

            let newId = 100;  // Starting ID
            if (latestVendor && latestVendor.vendor_id) {
                const latestId = parseInt(latestVendor.vendor_id.split('_')[1], 10);
                newId = latestId + 1;
            }
            vendor.vendor_id = `VNDR_${newId}`;
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Vendor;
