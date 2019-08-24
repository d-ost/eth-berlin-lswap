import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import coreConstants from '../../config/coreConstants';
import GenerateAddress from '../../lib/GenerateAddress';



 class Homescreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.checkForBurnerKey();
    }


    async checkForBurnerKey() {
        this.originBurnerKey = await ls.getItem(
          coreConstants.ORIGIN_BURNER_KEY,
        );
        console.log(this.originBurnerKey, 'this.originBurnerKey');
        if (this.originBurnerKey) {
        //   call to create one
          let generateAddress = new GenerateAddress()
          this.originBurnerKey = await generateAddress.perform;
          console.log(this.originBurnerKey, "this.originBurnerKey");         
          ls.saveItem(
            coreConstants.ORIGIN_BURNER_KEY,
            this.originBurnerKey.data,
          );
        }
      }

      render(){
          return <div> LSWAP </div>
      }

}

export default Homescreen;

