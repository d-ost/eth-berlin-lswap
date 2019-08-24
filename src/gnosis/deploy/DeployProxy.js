
const Web3 = require('web3');
const OpenST = require('@openst/openst.js');
const GnosisSafeHelper = OpenST.Helpers.GnosisSafe;
const abiBinProvider = new OpenST.AbiBinProvider();
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

class DeployProxy {

  constructor(params) {
    const oThis = this;
    oThis.masterCopyAddress = params['masterCopyAddress'];
    oThis.proxyFactoryAddress = params['proxyFactoryAddress'];
    oThis.ownerAddress = params['ownerAddress'];
    oThis.ownerPrivateKey = params['ownerPrivateKey'];
    oThis.web3 = new Web3(params['web3Endpoint']);
    oThis.erc20ToExchangeAddressMap = params['erc20ToExchangeAddressMap'] || {};
    oThis.relayerAccount = oThis.web3.eth.accounts.privateKeyToAccount(params['relayerPrivateKey']);
    console.log('relayerAccount', oThis.relayerAccount.address);
    oThis.web3.eth.accounts.wallet.add(oThis.relayerAccount);
  }

  async perform() {

    const oThis = this;

    await oThis.deployProxy();

    await oThis.performApproval();

    return {
      safeAddress: oThis.safeAddress
    }

  }

  async deployProxy() {

    const oThis = this;

    const masterCopyContract = new oThis.web3.eth.Contract(
      abiBinProvider.getABI('GnosisSafe'),
      oThis.masterCopyAddress
    );

    const proxyFactoryContract = new oThis.web3.eth.Contract(
      abiBinProvider.getABI('ProxyFactory'),
      oThis.proxyFactoryAddress
    );

    let gnosisSafeData = await masterCopyContract.methods.setup(
      [oThis.ownerAddress],
      1,
      "0x0000000000000000000000000000000000000000",
      "0x"
    ).encodeABI();

    const createProxyResponse =  await proxyFactoryContract.methods.createProxy(
      oThis.masterCopyAddress,
      gnosisSafeData
    ).send({
      from: oThis.relayerAccount.address,
      gasPrice: '0x3B9ACA00',
      gas: '7050328'
    });

    console.log('createProxyResponse', createProxyResponse);

    oThis.safeAddress = createProxyResponse['events']['ProxyCreated']['returnValues']['_proxy'];
    console.log('safeAddress', oThis.safeAddress);

  }

  async performApproval() {
    const oThis = this;
    const erc20Addresses = Object.keys(oThis.erc20ToExchangeAddressMap);
    for(let i=0; i<erc20Addresses.length; i++) {

      const erc20Address = erc20Addresses[i];
      const gnosisSafeHelper = new GnosisSafeHelper(oThis.safeAddress, oThis.web3);

      const nonce = await gnosisSafeHelper.getNonce();
      console.log('Approval Nonce', nonce);

      const erc20Contract = new oThis.web3.eth.Contract(
        erc20Abi,
        erc20Address
      );

      const executableDataForApprove = erc20Contract.methods.approve(
        oThis.erc20ToExchangeAddressMap[erc20Address],
        '100000000000000000000000' // large amount
      ).encodeABI();
      console.log('executableDataForApprove', executableDataForApprove);

      const safeTxDataForApprove = gnosisSafeHelper.getSafeTxData(
        erc20Address,
        0,
        executableDataForApprove,
        0,
        0,
        0,
        0,
        erc20Address,
        oThis.relayerAccount.address,
        nonce
      );
      console.log('safeTxDataForApprove', safeTxDataForApprove);

      const ownerAccount = oThis.web3.eth.accounts.privateKeyToAccount(oThis.ownerPrivateKey);

      // 2. Generate EIP712 Signature.
      const ownerSignatureApproval = await ownerAccount.signEIP712TypedData(safeTxDataForApprove);

      const approvalResult = await gnosisSafeHelper.execTransaction(
        erc20Address,
        0,
        executableDataForApprove,
        0,
        0,
        0,
        0,
        erc20Address,
        oThis.relayerAccount.address,
        ownerSignatureApproval.signature,
        {
          from: oThis.relayerAccount.address,
          gasPrice: '0x3B9ACA00',
          gas: '7050328'
        }
      );
      console.log('approvalResult', approvalResult);

      const allowance = await erc20Contract.methods.allowance(
        oThis.safeAddress,
        oThis.erc20ToExchangeAddressMap[erc20Address]
      ).call();
      console.log('allowance', allowance);
    }
  }

}

new DeployProxy({
  web3Endpoint: 'https://mosaicdao.org/aux/1405',
  masterCopyAddress:'0x5bc7e67Bc0F6400c8bFfd193A9Dff217a2F79294',
  proxyFactoryAddress: '0xC34B9569193CD401eA0C4C930E64D305BAE3faa3',
  relayerPrivateKey: '',
  ownerPrivateKey: '',
  ownerAddress:'0x5287cA6689ef7a096508610411835Cb100bCc104',
  erc20ToExchangeAddressMap: {
    '0xBB5676d85d28DA039F982C07E4217fB0FDB2c2ef': '0x6c4b1e7a3fd9692202fd6b31af9fd44f0b77a6b8'
  }
}).perform().then(console.log);