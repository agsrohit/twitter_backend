module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["Male", "Female"]],
            msg: "Gender must be Male or Female",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      create_at: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString(),
      },
      update_at: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString(),
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
