module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define("Test", {
        firstName: {
            type : DataTypes.STRING,
            allowNull: false
        }
    });

    return Test;
};