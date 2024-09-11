import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Accessory = sequelize.define('Accessory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accessory_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    vendor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please Provide Vendor ID'
            },
            isAlphanumeric: {
                msg: 'Vendor ID must be alphanumeric'
            },
            len: {
                args: [3, 10],
                msg: 'Vendor ID must be between 3 and 10 characters'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unit_cost: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lead_time: {
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
        beforeCreate: async (accessory, options) => {
            // const latestAccessory = await Accessory.findOne({
            //     order: [['createdAt', 'DESC']]
            // });

            // let newId = 0;  // Starting ID
            // if (latestAccessory && latestAccessory.id) {
            //     const latestId = parseInt(latestAccessory.id, 10);
            //     newId = latestId + 1;
            // }
            // accessory.accessory_id = `ACS${newId}`;
        },
        afterCreate: async(accessory, options) => {
            const updatedAccessoryId = `ACS_${accessory.id}`;
            await accessory.update({ accessory_id: updatedAccessoryId });
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Accessory;
