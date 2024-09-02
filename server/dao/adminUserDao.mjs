import AdminUser from '../model/adminuser.mjs';

export const adminUserDao = {
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

  // 更新管理員用戶信息
  update: async (id, updateData) => {
    const user = await AdminUser.findByPk(id);
    if (user) {
      return await user.update(updateData);
    }
    return null;
  },

  // 刪除管理員用戶
  delete: async (id) => {
    const user = await AdminUser.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
};

export default adminUserDao;