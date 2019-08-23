import AsyncStorage from '@react-native-community/async-storage';

export default {
  async saveItem(key, val) {
    try {
      if (typeof val == 'object') {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      await AsyncStorage.removeItem(key);
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      console.warn('AsyncStorage error: ' + error.message);
    }
  },

  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },

  async getItem(key) {
    res = await AsyncStorage.getItem(key);
    return AsyncStorage.getItem(key);
  },
};
