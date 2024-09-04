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
        allowNull: false
    },
    vendor_id: {
        type: DataTypes.STRING,
        allowNull: false
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

});

export default Spare;
