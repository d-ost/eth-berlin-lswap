import coreConstants from '../config/coreConstants';
import Web3Provider from "./Web3Provider";
import CoreAbis from "../config/CoreAbis";


class Facilitator {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params Facilitator');

    oThis.senderAddress = params.address;
    oThis.privateKey = params.privateKey;
    oThis.tokenName = params.tokenName;
    oThis.amount = params.amount;
    oThis.safeContractAddress = params.safeContractAddress;

    oThis.gatewayAddress = null;
  }

  async perform() {
    const oThis = this;

    await oThis._setParams();

    await oThis._mint();

    return {success: true, data: {}};
  }


  async _setParams() {
    const oThis = this;
    let web3Class = null;

    web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
    oThis.web3Instance = await web3Class.web3WsProvider();

    oThis.gatewayAddress = coreConstants.getGatewayAddress(oThis.tokenName);

    oThis.defaultgasPrice = coreConstants.originDefaultgasPrice;
    oThis.defaultgas = coreConstants.originDefaultgas;

  }

  async _mint() {
    const oThis = this;


    return new Promise((async (onResolve) => {

      const account = oThis.web3Instance.eth.accounts.privateKeyToAccount(oThis.privateKey);

      oThis.web3Instance.eth.accounts.wallet.add(account);
      const abi = [
        {
          constant: true,
          inputs: [
            {
              name: '',
              type: 'bytes32',
            },
          ],
          name: 'stakeRequests',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'organization',
          outputs: [
            {
              name: '',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '',
              type: 'address',
            },
          ],
          name: 'stakerProxies',
          outputs: [
            {
              name: '',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '',
              type: 'address',
            },
            {
              name: '',
              type: 'address',
            },
          ],
          name: 'stakeRequestHashes',
          outputs: [
            {
              name: '',
              type: 'bytes32',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'STAKEREQUEST_INTENT_TYPEHASH',
          outputs: [
            {
              name: '',
              type: 'bytes32',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              name: '_organization',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              name: 'amount',
              type: 'uint256',
            },
            {
              indexed: false,
              name: 'beneficiary',
              type: 'address',
            },
            {
              indexed: false,
              name: 'gasPrice',
              type: 'uint256',
            },
            {
              indexed: false,
              name: 'gasLimit',
              type: 'uint256',
            },
            {
              indexed: false,
              name: 'nonce',
              type: 'uint256',
            },
            {
              indexed: true,
              name: 'staker',
              type: 'address',
            },
            {
              indexed: false,
              name: 'stakerProxy',
              type: 'address',
            },
            {
              indexed: false,
              name: 'gateway',
              type: 'address',
            },
            {
              indexed: false,
              name: 'stakeRequestHash',
              type: 'bytes32',
            },
          ],
          name: 'StakeRequested',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'staker',
              type: 'address',
            },
            {
              indexed: false,
              name: 'stakeRequestHash',
              type: 'bytes32',
            },
          ],
          name: 'StakeRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'staker',
              type: 'address',
            },
            {
              indexed: false,
              name: 'stakeRequestHash',
              type: 'bytes32',
            },
          ],
          name: 'StakeRejected',
          type: 'event',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_amount',
              type: 'uint256',
            },
            {
              name: '_beneficiary',
              type: 'address',
            },
            {
              name: '_gasPrice',
              type: 'uint256',
            },
            {
              name: '_gasLimit',
              type: 'uint256',
            },
            {
              name: '_nonce',
              type: 'uint256',
            },
            {
              name: '_gateway',
              type: 'address',
            },
          ],
          name: 'requestStake',
          outputs: [
            {
              name: 'stakeRequestHash_',
              type: 'bytes32',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_amount',
              type: 'uint256',
            },
            {
              name: '_beneficiary',
              type: 'address',
            },
            {
              name: '_gasPrice',
              type: 'uint256',
            },
            {
              name: '_gasLimit',
              type: 'uint256',
            },
            {
              name: '_nonce',
              type: 'uint256',
            },
            {
              name: '_staker',
              type: 'address',
            },
            {
              name: '_gateway',
              type: 'address',
            },
            {
              name: '_hashLock',
              type: 'bytes32',
            },
          ],
          name: 'acceptStakeRequest',
          outputs: [
            {
              name: 'messageHash_',
              type: 'bytes32',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_amount',
              type: 'uint256',
            },
            {
              name: '_beneficiary',
              type: 'address',
            },
            {
              name: '_gasPrice',
              type: 'uint256',
            },
            {
              name: '_gasLimit',
              type: 'uint256',
            },
            {
              name: '_nonce',
              type: 'uint256',
            },
            {
              name: '_gateway',
              type: 'address',
            },
          ],
          name: 'revokeStakeRequest',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_amount',
              type: 'uint256',
            },
            {
              name: '_beneficiary',
              type: 'address',
            },
            {
              name: '_gasPrice',
              type: 'uint256',
            },
            {
              name: '_gasLimit',
              type: 'uint256',
            },
            {
              name: '_nonce',
              type: 'uint256',
            },
            {
              name: '_staker',
              type: 'address',
            },
            {
              name: '_gateway',
              type: 'address',
            },
          ],
          name: 'rejectStakeRequest',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [],
          name: 'destructStakerProxy',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ];

      const ostComposerAddress = '0xeaa192d486ac5243886a28001e27a68cae5fde4b';
      const contract = new oThis.web3Instance.eth.Contract(abi, ostComposerAddress);


      contract.methods.requestStake(
        oThis.amount,
        oThis.safeContractAddress,
        '0',
        '0',
        '1',
        oThis.gatewayAddress,
        )
        .send({
          from: oThis.senderAddress,
          gasPrice: oThis.defaultgasPrice,
          gas: oThis.defaultgas,
        }).on('error', (error) => {
          console.log('Error on Facilitator ', error);
        })
        .on('transactionHash', (transactionHash) => {
          console.log('Transaction hash for Facilitator', transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('Receipt  for Facilitator', receipt);
          onResolve();
        });

    }));
  }


}

export default Facilitator;