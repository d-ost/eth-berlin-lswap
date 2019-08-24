import GenericERC20 from '../contracts/abi/GenericERC20';
import GenericUniSwap from '../contracts/abi/GenericUniSwap';


const nameToAbiMap = {};

// function parseFile(filePath, options) {
//   filePath = path.join(__dirname, '/' + filePath);
//   const fileContent = fs.readFileSync(filePath, options || 'utf8');

//   return JSON.parse(fileContent);
// }


class CoreAbis {

  static get genericErc20() {   
    return GenericERC20;
  }

  static get genericUniSwap() {
    return GenericUniSwap;
  }

}

export default CoreAbis;