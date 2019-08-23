import React, {Component} from 'react';
import {View, Text} from 'react-native';
import asyncStorage from '../../src/lib/asyncStorage';
import GenerateAddress from '../../src/lib/GenerateAddress';
import coreConstants from '../../src/config/coreConstants';

class NotificationList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkForBurnerKey();
  }

  async checkForBurnerKey() {
    this.originBurnerKey = await asyncStorage.getItem(coreConstants.ORIGIN_BURNER_KEY);
    console.log(this.originBurnerKey, 'this.originBurnerKey');
    if (!this.originBurnerKey) {
      // call to create one 
      let generateAddress = new GenerateAddress()
      // this.originBurnerKey = await generateAddress.perform();
      this.originBurnerKey = {success: true, data: {publicKey: 'nefjenwfknwekfnweknf', privateKey: 'efwefuiewhufihewuhweui'}}
      asyncStorage.saveItem(coreConstants.ORIGIN_BURNER_KEY, this.originBurnerKey.data);
      console.log(asyncStorage.getItem(this.originBurnerKey), 'new burner key saved');

    }
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default NotificationList;
