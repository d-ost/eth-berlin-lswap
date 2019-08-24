import ls from 'local-storage';



export default {
  async saveItem(key, val) {
    try {
      if (typeof val == 'object') {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      await ls.remove(key);
      await ls.set(key, val);
    } catch (error) {
      console.warn('ls error: ' + error.message);
    }
  },

  removeItem(key) {
    return ls.remove(key);
  },

  async getItem(key) {
    let res = await ls.get(key);
    return res;
  },
};
