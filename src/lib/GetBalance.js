import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';
import CoreAbis from '../../src/config/CoreAbis';


class GetBalance {

    constructor(params) {
        const oThis = this;
        console.log(params, 'params GetBalance')
        oThis.chainKind = params.chainKind;
        oThis.address = params.address;
        oThis.tokenName = params.tokenName;

        oThis.erc20TokenAbi = CoreAbis.genericErc20;
        oThis.isBaseCurrency = false;

        oThis.web3Instance = null;
        oThis.contractAddress = null;
        oThis.balance = null;
    }

    async perform() {
        const oThis = this;

        await oThis._seParams();

        await oThis._fetchBalance();

        return {success: true, data: {balance: oThis.balance}};
    }

    async _seParams() {
        const oThis = this;

        if (oThis.chainKind == coreConstants.originChainKind) {
            oThis.web3Instance = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER).web3WsProvider;
            oThis.contractAddress = coreConstants.getOriginChainContractAddress(oThis.tokenName);
        } else if (oThis.chainKind == coreConstants.auxChainKind) {
            oThis.web3Instance = new Web3Provider(coreConstants.AUX_WS_PROVIDER).web3WsProvider;

            if (oThis.tokenName === coreConstants.ostTokenName) {
                oThis.isBaseCurrency = true;
            } else {
                oThis.contractAddress = coreConstants.getAuxChainContractAddress(oThis.tokenName);
            }
        } else {
            throw `Invalid ${oThis.chainId}`
        }
    }

    async _fetchBalance() {
        const oThis = this;

        console.log("oThis.addressoThis.address===========================", oThis.address);

        if (oThis.isBaseCurrency) {
            oThis.web3Instance.eth.getBalance(oThis.address).then(function (balance) {
                console.log("oThis.balance.balance====================", balance);

                oThis.balance = balance;
            });
        } else {
            const erc20TokenContractObj = await oThis.web3Instance.eth.Contract(oThis.erc20TokenAbi, oThis.contractAddress);

            console.log("erc20TokenContractObj====================", erc20TokenContractObj);


            erc20TokenContractObj
                .methods
                .balanceOf(oThis.address)
                .call({}).then(function (balance) {
                console.log("oThis.balance.balance====================", balance);
                oThis.balance = balance;
            });
        }
    }
}

export default GetBalance;
