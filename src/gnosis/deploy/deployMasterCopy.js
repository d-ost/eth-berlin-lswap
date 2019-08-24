const Web3 = require('web3');
const OpenST = require('@openst/openst.js');

async function deploy() {
  // const web3 = new Web3('https://mosaicdao.org/aux/1405');
  const web3 = new Web3('https://mosaicdao.org/origin/goerli');
  const privateKey = '';
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log('address ', account.address);
  web3.eth.accounts.wallet.add(account);

  txOptions = {
    from: account.address,
    gasPrice: '0x3B9ACA00',
    gas: '7050328'
  };

  const userSetup = new OpenST.Setup.User(web3);
  let gnosisMasterCopyAddress;
  userSetup.deployMultiSigMasterCopy(txOptions).then(function(response){
    gnosisMasterCopyAddress = response.receipt.contractAddress;
    console.log('gnosisMasterCopyAddress', gnosisMasterCopyAddress);
  });

}

deploy()
  .then(console.log)
  .catch((error) => {
  console.log('Big error ', error);
});
