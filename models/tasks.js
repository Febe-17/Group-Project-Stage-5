'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tasks.belongsTo(models.label,{
        foreignKey: 'id_label'
      })
      tasks.hasOne(models.assigned,{
        foreignKey : "id_task"
      })
    }
  }
  tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    id_label: DataTypes.INTEGER,
    status_task: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};