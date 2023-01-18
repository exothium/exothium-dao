import {connect, disconnect, StarknetWindowObject} from "get-starknet";
import {ConnectOptions, DisconnectOptions} from "get-starknet";
import erc721_abi from './contracts/abis/erc721_abi.json';
import { Contract, number, uint256, shortString } from "starknet";
import BN__default from 'bn.js';

const { toBN, toHex, bigNumberishArrayToDecimalStringArray, getHexString } = number;
const { bnToUint256, uint256ToBN } = uint256;
const { encodeShortString, decodeShortString } = shortString;
let starknet : StarknetWindowObject | null;
let erc721Contract : Contract | null;

export function starknetConnect(options?: ConnectOptions) {
    return new Promise((resolve, reject) => {
        connect(options)
            .then((starknetProp) => {
                starknet = starknetProp;
                initContract(starknet);
                resolve(starknetProp);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function starknetDisconnect(options?: DisconnectOptions) {
    return new Promise<void>((resolve, reject) => {
        disconnect(options)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function initContract(starknet : StarknetWindowObject | null) {
    if (starknet == null) {
        throw new Error("starknet is null");
    }
    erc721Contract = new Contract( erc721_abi, '0x00a6250dc8060cef8f83c0a50a1c4a47285f876a7f081b5b42a102f24a43b404', starknet.account);
}

export function ownerOfExothian(nftNumber : number) : Promise<string> {
    try {
        return erc721Contract?.ownerOf(bnToUint256(nftNumber)).then((ownerProp : [BN__default]) => {
            let owner = getHexString(bigNumberishArrayToDecimalStringArray(ownerProp)[0]);
            return owner;
        });
    } catch (error) {
        return Promise.reject(error);
    }
};



