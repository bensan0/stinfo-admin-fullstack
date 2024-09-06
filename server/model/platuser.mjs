import { DataTypes } from 'sequelize';
import { sequelize } from '../database.mjs';

const PlatUser = sequelize.define('PlatUser', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'plat_user',
    timestamps: false
  });
  
  export default PlatUser;