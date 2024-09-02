import { DataTypes } from 'sequelize';
import { sequelize } from '../database.mjs';

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
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
  }
}, {
  tableName: 'admin_user',
  timestamps: true 
});

(async () => {
  await sequelize.sync();
})();

export default AdminUser;