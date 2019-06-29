'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    name: DataTypes.STRING,
    clicks: DataTypes.JSON
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};