//
// const Web3 = require('web3');
// const OpenST = require('@openst/openst.js');
// const abiBinProvider = new OpenST.AbiBinProvider();
// const gnosisMasterCopyAddress = '0x52C961cA6e85C3367f1516895D55130f1397c9bf';
//
// async function deploy() {
//
//   // const web3 = new Web3('https://mosaicdao.org/aux/1405');
//   const web3 = new Web3('https://mosaicdao.org/origin/goerli');
//   const privateKey = '';
//   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//   console.log('address ', account.address);
//   web3.eth.accounts.wallet.add(account);
//
//   const contract = new web3.eth.Contract(
//     abiBinProvider.getABI('GnosisSafe'),
//     gnosisMasterCopyAddress
//   );
//
//   contract.methods.setup(
//     ['0x0000000000000000000000000000000000000002'],
//     1,
//     "0x0000000000000000000000000000000000000000",
//     "0x"
//   ).send({
//     from: account.address,
//     gasPrice: '0x3B9ACA00',
//     gas: '7050328'
//   })
//     .then(console.log)
//     .catch(function (error) {
//       console.log('error', error)
//     })
//
// }
//
// deploy()
//   .then(function (resppnse) {
//     console.log('resppnse', resppnse);
//   })
//   .catch(function (error) {
//     console.log('error', error);
//   });
//
