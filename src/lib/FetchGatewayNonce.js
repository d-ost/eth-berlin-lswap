
import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';

const gatewayAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "proposedBountyUnlockHeight",
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
        "name": "_proposedBounty",
        "type": "uint256"
      }
    ],
    "name": "initiateBountyAmountChange",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getOutboxActiveProcess",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      },
      {
        "name": "status_",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "activated",
    "outputs": [
      {
        "name": "",
        "type": "bool"
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
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_rlpAccount",
        "type": "bytes"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      }
    ],
    "name": "proveGateway",
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
    "name": "organization",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "burner",
    "outputs": [
      {
        "name": "",
        "type": "address"
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
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "messages",
    "outputs": [
      {
        "name": "intentHash",
        "type": "bytes32"
      },
      {
        "name": "nonce",
        "type": "uint256"
      },
      {
        "name": "gasPrice",
        "type": "uint256"
      },
      {
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "hashLock",
        "type": "bytes32"
      },
      {
        "name": "gasConsumed",
        "type": "uint256"
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
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getNonce",
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
    "constant": true,
    "inputs": [],
    "name": "stakeVault",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "MESSAGE_BOX_OFFSET",
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
        "name": "_messageHash",
        "type": "bytes32"
      }
    ],
    "name": "getInboxMessageStatus",
    "outputs": [
      {
        "name": "status_",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "remoteGateway",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "BOUNTY_CHANGE_UNLOCK_PERIOD",
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
    "constant": true,
    "inputs": [],
    "name": "bounty",
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
    "constant": true,
    "inputs": [],
    "name": "REVOCATION_PENALTY",
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
    "inputs": [],
    "name": "proposedBounty",
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
    "constant": true,
    "inputs": [
      {
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getInboxActiveProcess",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      },
      {
        "name": "status_",
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
        "name": "_messageHash",
        "type": "bytes32"
      }
    ],
    "name": "getOutboxMessageStatus",
    "outputs": [
      {
        "name": "status_",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "encodedGatewayPath",
    "outputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "baseToken",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "stateRootProvider",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "confirmBountyAmountChange",
    "outputs": [
      {
        "name": "changedBountyAmount_",
        "type": "uint256"
      },
      {
        "name": "previousBountyAmount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "valueToken",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_valueToken",
        "type": "address"
      },
      {
        "name": "_baseToken",
        "type": "address"
      },
      {
        "name": "_stateRootProvider",
        "type": "address"
      },
      {
        "name": "_bounty",
        "type": "uint256"
      },
      {
        "name": "_organization",
        "type": "address"
      },
      {
        "name": "_burner",
        "type": "address"
      },
      {
        "name": "_maxStorageRootItems",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_stakerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "StakeIntentDeclared",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_stakerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_proofProgress",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "_unlockSecret",
        "type": "bytes32"
      }
    ],
    "name": "StakeProgressed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_stakerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RevertStakeIntentDeclared",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_stakerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "StakeReverted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_redeemerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_hashLock",
        "type": "bytes32"
      }
    ],
    "name": "RedeemIntentConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_redeemAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_unstakeAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_rewardAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_proofProgress",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "_unlockSecret",
        "type": "bytes32"
      }
    ],
    "name": "UnstakeProgressed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_redeemerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RevertRedeemIntentConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_redeemerNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RevertRedeemComplete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_gateway",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_storageRoot",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_wasAlreadyProved",
        "type": "bool"
      }
    ],
    "name": "GatewayProven",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_currentBounty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_proposedBounty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_unlockHeight",
        "type": "uint256"
      }
    ],
    "name": "BountyChangeInitiated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_currentBounty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_changedBounty",
        "type": "uint256"
      }
    ],
    "name": "BountyChangeConfirmed",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "name": "_hashLock",
        "type": "bytes32"
      }
    ],
    "name": "stake",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_unlockSecret",
        "type": "bytes32"
      }
    ],
    "name": "progressStake",
    "outputs": [
      {
        "name": "staker_",
        "type": "address"
      },
      {
        "name": "stakeAmount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      },
      {
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_messageStatus",
        "type": "uint256"
      }
    ],
    "name": "progressStakeWithProof",
    "outputs": [
      {
        "name": "staker_",
        "type": "address"
      },
      {
        "name": "stakeAmount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      }
    ],
    "name": "revertStake",
    "outputs": [
      {
        "name": "staker_",
        "type": "address"
      },
      {
        "name": "stakerNonce_",
        "type": "uint256"
      },
      {
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      }
    ],
    "name": "progressRevertStake",
    "outputs": [
      {
        "name": "staker_",
        "type": "address"
      },
      {
        "name": "stakerNonce_",
        "type": "uint256"
      },
      {
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_redeemer",
        "type": "address"
      },
      {
        "name": "_redeemerNonce",
        "type": "uint256"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_hashLock",
        "type": "bytes32"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      }
    ],
    "name": "confirmRedeemIntent",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_unlockSecret",
        "type": "bytes32"
      }
    ],
    "name": "progressUnstake",
    "outputs": [
      {
        "name": "redeemAmount_",
        "type": "uint256"
      },
      {
        "name": "unstakeAmount_",
        "type": "uint256"
      },
      {
        "name": "rewardAmount_",
        "type": "uint256"
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
        "name": "_messageHash",
        "type": "bytes32"
      }
    ],
    "name": "penalty",
    "outputs": [
      {
        "name": "penalty_",
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
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      },
      {
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_messageStatus",
        "type": "uint256"
      }
    ],
    "name": "progressUnstakeWithProof",
    "outputs": [
      {
        "name": "redeemAmount_",
        "type": "uint256"
      },
      {
        "name": "unstakeAmount_",
        "type": "uint256"
      },
      {
        "name": "rewardAmount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes32"
      },
      {
        "name": "_blockHeight",
        "type": "uint256"
      },
      {
        "name": "_rlpParentNodes",
        "type": "bytes"
      }
    ],
    "name": "confirmRevertRedeemIntent",
    "outputs": [
      {
        "name": "redeemer_",
        "type": "address"
      },
      {
        "name": "redeemerNonce_",
        "type": "uint256"
      },
      {
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_coGatewayAddress",
        "type": "address"
      }
    ],
    "name": "activateGateway",
    "outputs": [
      {
        "name": "success_",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deactivateGateway",
    "outputs": [
      {
        "name": "success_",
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
    "name": "token",
    "outputs": [
      {
        "name": "valueToken_",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const composerAbi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "stakeRequests",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "beneficiary",
        "type": "address"
      },
      {
        "name": "gasPrice",
        "type": "uint256"
      },
      {
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "name": "nonce",
        "type": "uint256"
      },
      {
        "name": "staker",
        "type": "address"
      },
      {
        "name": "gateway",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "organization",
    "outputs": [
      {
        "name": "",
        "type": "address"
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
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakerProxies",
    "outputs": [
      {
        "name": "",
        "type": "address"
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
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakeRequestHashes",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
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
        "name": "",
        "type": "address"
      }
    ],
    "name": "STAKEREQUEST_INTENT_TYPEHASH",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
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
        "name": "_organization",
        "type": "address"
      }
    ],
    "name": "STAKEREQUEST_INTENT_TYPEHASH",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      },
      {
        "indexed": false,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "gasPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "nonce",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "gateway",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "stakeRequestHash",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "event",
    "anonymous": false,
    "name": "StakeRequested"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "stakeRequestHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "gasPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "nonce",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "gateway",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "stakeRequestHash",
        "type": "bytes32"
      }
    ],
    "name": "StakeRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "staker",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "stakeRequestHash",
        "type": "bytes32"
      }
    ],
    "name": "StakeRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "name": "_gateway",
        "type": "address"
      }
    ],
    "name": "requestStake",
    "type": "function",
    "constant": false,
    "outputs": [
      {
        "name": "stakeRequestHash_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "name": "_staker",
        "type": "address"
      },
      {
        "name": "_gateway",
        "type": "address"
      },
      {
        "name": "_hashLock",
        "type": "bytes32"
      }
    ],
    "name": "acceptStakeRequest",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "name": "_gateway",
        "type": "address"
      }
    ],
    "name": "revokeStakeRequest",
    "outputs": [
      {
        "name": "messageHash_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_gasPrice",
        "type": "uint256"
      },
      {
        "name": "_gasLimit",
        "type": "uint256"
      },
      {
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "name": "_staker",
        "type": "address"
      },
      {
        "name": "_gateway",
        "type": "address"
      }
    ],
    "name": "rejectStakeRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_stakeRequestHash",
        "type": "bytes32"
      }
    ],
    "name": "destructStakerProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "removeStakerProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const composerAddress = '0xeaa192d486ac5243886a28001e27a68cae5fde4b';

const web3 = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);

class FetchGatewayNonce {

  constructor(params) {
    const oThis = this;
    oThis.staker = params['stakerAddress'];
    oThis.gatewayAddress = params['gatewayAddress']
  }

  async perform() {

    const oThis = this;

    const gatewayContract = new web3.eth.Contract(
      gatewayAbi,
      oThis.gatewayAddress
    );

    const composerContract = new web3.eth.Contract(
      composerAbi,
      composerAddress
    );

    console.log('composerContract.methods.stakerProxies',  oThis.staker);

    const stakerProxy = await composerContract.methods.stakerProxies(oThis.staker).call();
    console.log('stakerProxy', stakerProxy);

    const nonce = await gatewayContract.methods.getNonce(stakerProxy).call();

    return nonce;

  }

}

export default FetchGatewayNonce;

// new FetchGatewayNonce({
//   stakerAddress: '0xAf9327b0A8F1Af06992Ff7F24ECa6541c5653B30',
//   gatewayAddress: '0xe11e76C1ecA13Ae4ABA871EabDf37C24b8e1928B'
// }).perform().then(console.log);