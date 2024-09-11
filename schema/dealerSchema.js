import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Dealer = sequelize.define('Dealer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dealer_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone_number: {
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
        beforeCreate: async (dealer, options) => {
            // const latestDealer = await Dealer.findOne({
            //     order: [['createdAt', 'DESC']]
            // });

            // let newId = 0;  // Starting ID
            // if (latestDealer && latestDealer.id) {
            //     const latestId = parseInt(latestDealer.id, 10);
            //     newId = latestId + 1;
            // }
            // dealer.dealer_id = `DLR${newId}`;
        },
        afterCreate: async(dealer, options) => {
            // let existingSpare = await Dealer.findOne({ where: { id:dealer.id } });
            // dealer.dealer_id = `DLR_${dealer.id}`;
            // let updateRes = await existingSpare.update(dealer.dataValues);
            const updatedDealerId = `DLR_${dealer.id}`;
            await dealer.update({ dealer_id: updatedDealerId });
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Dealer;
