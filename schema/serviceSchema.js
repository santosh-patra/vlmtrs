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
        allowNull: false
    },
    dealer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please Provide Dealer ID'
            }
        }
    },
    vehicle_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please Provide Vehicle ID'
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
            let existingSpare = await Service.findOne({ where: { id:service.id } });
            service.service_id = `SVR_${service.id}`;
            let updateRes = await existingSpare.update(service.dataValues);
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Service;
