const rootPrefix = '..';

const nameToAbiMap = {};

function parseFile(filePath, options) {
  filePath = path.join(__dirname, '/' + filePath);
  const fileContent = fs.readFileSync(filePath, options || 'utf8');

  return JSON.parse(fileContent);
}


class CoreAbis {

  static get genericErc20() {
    if (nameToAbiMap.genericErc20) {
      return nameToAbiMap.genericErc20;
    }
    nameToAbiMap.genericErc20 = parseFile(rootPrefix + '/src/contracts/abi/GenericERC20.abi', 'utf8');

    return nameToAbiMap.genericErc20;
  }

}

module.exports = CoreAbis;