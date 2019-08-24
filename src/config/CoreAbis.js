import GenericERC20 from '../contracts/abi/GenericERC20';


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

}

export default CoreAbis;