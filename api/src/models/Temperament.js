const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      // id: {
      //   type: DataTypes.UUID,
      //   primaryKey: true,
      //   defaultValue: UUIDV4,
      //   allowNull: false,
      // },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "temperament",
      name: { singular: "temperament", plural: "temperament" },
    }
  );
};
