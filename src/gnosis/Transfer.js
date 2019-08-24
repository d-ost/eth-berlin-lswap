
const Web3 = require('web3');
const Bignumber = require('bignumber.js');
const OpenST = require('@openst/openst.js');
const GnosisSafeHelper = OpenST.Helpers.GnosisSafe;
const erc20Abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

class Transfer {

  //NOTE: if erc20Address is not passed, we use base currency of chain
  constructor(params) {
    const oThis = this;
    oThis.safeAddress = params['safeAddress'];
    oThis.relayerPrivateKey = params['relayerPrivateKey'];
    oThis.ownerPrivateKey = params['ownerPrivateKey'];
    oThis.reciepientAddress = params['reciepientAddress'];
    oThis.transferAmount = params['transferAmount'];
    oThis.erc20Address = params['erc20Address'];
    oThis.web3 = new Web3(params['web3Endpoint']);
  }

  async perform() {

    const oThis = this;

    const relayerAccount = oThis.web3.eth.accounts.privateKeyToAccount(oThis.relayerPrivateKey);
    console.log('relayerAddress ', relayerAccount.address);
    oThis.web3.eth.accounts.wallet.add(relayerAccount);

    const gnosisSafeHelper = new GnosisSafeHelper(oThis.safeAddress, oThis.web3);

    const ownerAccount = oThis.web3.eth.accounts.privateKeyToAccount(oThis.ownerPrivateKey);
    console.log('ownerAccount ', ownerAccount.address);
    oThis.web3.eth.accounts.wallet.add(ownerAccount);

    const senderBalance = await oThis.getBalance(oThis.safeAddress);
    console.log('senderBalance', senderBalance);
    if (new Bignumber(senderBalance).lt(new Bignumber(oThis.transferAmount))) {
      throw Error('Insufficient balance');
    }

    const reciepientBalance = await oThis.getBalance(oThis.reciepientAddress);
    console.log('reciepientBalance', reciepientBalance);

    let executableDataForTransfer = oThis.isBaseCurrencyOfChain() ? '0x0000000000000000000000000000000000000000' : oThis.erc20Contract().methods.transfer(
      oThis.reciepientAddress,
      oThis.transferAmount
    ).encodeABI();

    console.log('executableDataForTransfer', executableDataForTransfer);

    let transferValue = oThis.isBaseCurrencyOfChain() ? oThis.transferAmount : 0;
    console.log('transferValue', transferValue);

    let toAddress = oThis.isBaseCurrencyOfChain() ? oThis.reciepientAddress : oThis.erc20Address;
    console.log('toAddress', toAddress);

    let gasToken = oThis.isBaseCurrencyOfChain() ? '0x0000000000000000000000000000000000000000' : oThis.erc20Address;
    console.log('gasToken', gasToken);

    const nonceforTransfer = await gnosisSafeHelper.getNonce();
    console.log('nonceforTransfer', nonceforTransfer);

    const safeTxDataForTransfer = gnosisSafeHelper.getSafeTxData(
      toAddress,
      transferValue,
      executableDataForTransfer,
      0,
      0,
      0,
      0,
      gasToken,
      relayerAccount.address,
      nonceforTransfer
    );
    console.log('safeTxData', safeTxDataForTransfer);

    // 2. Generate EIP712 Signature.
    const ownerSignatureTransfer = await ownerAccount.signEIP712TypedData(safeTxDataForTransfer);

    const result = await gnosisSafeHelper.execTransaction(
      toAddress,
      transferValue,
      executableDataForTransfer,
      0,
      0,
      0,
      0,
      gasToken,
      relayerAccount.address,
      ownerSignatureTransfer.signature,
      {
        from: relayerAccount.address,
        gasPrice: '0x3B9ACA00',
        gas: '5050328'
      }
    );

    console.log('result', result);

    const reciepientBalanceNew = await oThis.getBalance(oThis.reciepientAddress);
    console.log('reciepientBalanceNew', reciepientBalanceNew);

  }

  async getBalance(address) {
    const oThis = this;
    if (oThis.isBaseCurrencyOfChain()) {
      return await oThis.web3.eth.getBalance(address);
    } else {
      return await oThis.erc20Contract().methods.balanceOf(address).call();
    }
  }

  isBaseCurrencyOfChain() {
    const oThis = this;
    return oThis.erc20Address === null || oThis.erc20Address === undefined;
  }

  erc20Contract() {
    const oThis = this;
    return new oThis.web3.eth.Contract(
      erc20Abi,
      oThis.erc20Address
    );
  }

}

const params = {
  web3Endpoint: 'https://mosaicdao.org/aux/1405',
  // safeAddress: '0xCD0D01dF87A8B13980D9e8Db1B163c9460132184',
  safeAddress: '0x46991624171789243Eec5D55f68cf59d8123F688',
  // erc20Address: '0xBB5676d85d28DA039F982C07E4217fB0FDB2c2ef',
  relayerPrivateKey: '',
  ownerPrivateKey: '',
  reciepientAddress: '0x6c98c712546742f0570bdab411256865c29e80fa',
  transferAmount: '1'
};

new Transfer(params).perform().then(console.log);