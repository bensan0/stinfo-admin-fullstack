import AdminUser from '../model/adminuser.mjs';
import crypto from 'crypto'
import { Util } from '../util/util.mjs'

export const AdminUserDao = {
  // 創建新管理員用戶
  create: async (username, password, salt) => {
    return await AdminUser.create({ username, password, salt });
  },

  // 根據 ID 查找管理員用戶
  findById: async (id) => {
    return await AdminUser.findByPk(id, {
      attributes: ['id', 'username', 'createdAt']
    });
  },

  // 根據用戶名查找管理員用戶
  findByUsername: async (username) => {
    return await AdminUser.findOne({ where: { username } });
  },

  // 核對密碼
  comparePassword: async (id, password) => {
    console.log('dao核對密碼!!!')
    let adminuser = await AdminUser.findByPk(id, {
      attributes: ['password', 'salt']
    })
    console.log('dao admin=' + JSON.stringify(adminuser))
    if (adminuser.password !== crypto.createHash('md5').update(password + adminuser.salt).digest('hex')) {
      return false
    } else {
      return true
    }
  },

  // 更新管理員密碼
  updatePassword: async (id, password) => {
    const adminuser = await AdminUser.findByPk(id);
    if (adminuser !== null) {
      return await adminuser.update({ password: Util.hashPassword(adminuser.salt, password) }, {
        where: {
          id: id
        }
      });
    }
    return null;
  },

  // 刪除管理員用戶
  delete: async (id) => {
    const user = await AdminUser.destroy({
      where: {
        id: id
      }
    });
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
};

export default AdminUserDao;