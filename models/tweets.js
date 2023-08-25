



module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define("tweet", {
    tweet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tweet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
    },
    update_at: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
    },
  });

  return Tweet;
};
