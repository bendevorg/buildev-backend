module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false
    },
    role: {
      type: DataTypes.ENUM(
        'user',
        'admin'
      ),
      allowNull: true,
      notEmpty: false
    }
  });

  Users.associate = models => {
  };

  return Users;
};