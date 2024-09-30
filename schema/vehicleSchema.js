import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vehicle_id: {
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
            len: {
                args: [3, 10],
                msg: 'Dealer ID must be between 3 and 10 characters'
            }
        }
    },
    // vin: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    chassis_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    motor_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    battery_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    color_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mfg_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    barcode: {
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
        beforeCreate: async (vehicle, options) => {
            // const latestVehicle = await Vehicle.findOne({
            //     order: [['createdAt', 'DESC']]
            // });

            // let newId = 0;  // Starting ID
            // if (latestVehicle && latestVehicle.id) {
            //     const latestId = parseInt(latestVehicle.id, 10);
            //     newId = latestId + 1;
            // }
            // vehicle.vehicle_id = `VHL${newId}`;
        },
        afterCreate: async(vehicle, options) => {
            // let existingSpare = await Vehicle.findOne({ where: { id:vehicle.id } });
            // vehicle.vehicle_id = `VHL_${vehicle.id}`;
            // let updateRes = await existingSpare.update(vehicle.dataValues);
            const updatedVehicleId = `VHL_${vehicle.id}`;
            await vehicle.update({ vehicle_id: updatedVehicleId });
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Vehicle;
