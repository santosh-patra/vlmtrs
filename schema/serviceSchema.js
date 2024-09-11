import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    service_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    dealer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please Provide Dealer ID'
            },
            isAlphanumeric: {
                msg: 'Dealer ID must be alphanumeric'
            },
            len: {
                args: [3, 10],
                msg: 'Dealer ID must be between 3 and 10 characters'
            }
        }
    },
    vehicle_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please Provide Vehicle ID'
            },
            isAlphanumeric: {
                msg: 'Vehicle ID must be alphanumeric'
            },
            len: {
                args: [3, 10],
                msg: 'Vehicle ID must be between 3 and 10 characters'
            }
        }
    },
    service_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cost: {
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
        beforeCreate: async (service, options) => {
            // const latestService = await Service.findOne({
            //     order: [['createdAt', 'DESC']]
            // });

            // let newId = 0;  // Starting ID
            // if (latestService && latestService.id) {
            //     const latestId = parseInt(latestService.id, 10);
            //     newId = latestId + 1;
            // }
            // service.service_id = `SVR${newId}`;
        },
        afterCreate: async(service, options) => {
            // let existingSpare = await Service.findOne({ where: { id:service.id } });
            // service.service_id = `SVR_${service.id}`;
            // let updateRes = await existingSpare.update(service.dataValues);
            const updatedServiceId = `SVR_${service.id}`;
            await service.update({ service_id: updatedServiceId });
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Service;
