import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Spare = sequelize.define('Spare', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    spare_id: {
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
    part_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unit_cost: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // unit_cost: {
    //     type: DataTypes.DECIMAL(10, 2),
    //     allowNull: true,
    //     validate: {
    //         isDecimal: {
    //             msg: 'Unit cost must be a valid decimal value'
    //         }
    //     }
    // },
    // lead_time: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
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
        beforeCreate: async (spare, options) => {
            // const latestSpare = await Spare.findOne({
            //     order: [['createdAt', 'DESC']]
            // });
            // console.log("latestSpare--->",latestSpare)

            // let newId = 1;  // Starting ID
            // if (latestSpare && latestSpare.id) {
            //     const latestId = parseInt(latestSpare.id);
            //     newId = latestId + 1;
            // }
            // spare.spare_id = `SPR_${spare.id}`;
        },
        afterCreate: async (spare, options) => {
            // let existingSpare = await Spare.findOne({ where: { id:spare.id } });
            // spare.spare_id = `SPR_${spare.id}`;
            // let updateRes = await existingSpare.update(spare.dataValues);
            const updatedSpareId = `SPR_${spare.id}`;
            await spare.update({ spare_id: updatedSpareId });
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Spare;
