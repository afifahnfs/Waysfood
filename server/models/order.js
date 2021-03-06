"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            order.belongsTo(models.product, {
                as: "product",
                foreignKey: {
                    name: "idProduct",
                },
            });

            // order.hasMany(models.product, {
            //     as: "products",
            //     foreignKey: {
            //         name: "idProduct",
            //     },
            // });

            order.belongsTo(models.transaction, {
                as: "transaction",
                foreignKey: {
                    name: "idTransaction",
                },
            });
        }
    }
    order.init(
        {
            idProduct: DataTypes.INTEGER,
            qty: DataTypes.INTEGER,
            idTransaction: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "order",
        }
    );
    return order;
};
