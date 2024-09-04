import AdminUser from '../model/adminuser.mjs';
import crypto from 'crypto'

export const AdminUserDao = {
  // 創建新管理員用戶
  create: async (username, password, salt) => {
    return await AdminUser.create({ username, password, salt });
  },

  // 根據 ID 查找管理員用戶
  findById: async (id) => {
    return await AdminUser.findByPk(id);
  },

  // 根據用戶名查找管理員用戶
  findByUsername: async (username) => {
    return await AdminUser.findOne({ where: { username } });
  },

  // 核對密碼
  comparePassword: async (id, password) =>{
    let adminuser = await findById(id, {
      attributes: ['password', 'salt']
    })

    if(adminuser.password !== crypto.createHash('md5').update(adminuser.password + adminuser.salt).digest('hex')){
      return false
    }else{
      return true
    } 
  },

  // 更新管理員密碼
  updatePassword: async (id, password) => {
    const user = await AdminUser.findByPk(id);
    if (user !== null) {
      return await user.update({ password: password }, {
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
      where:{
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