# Exothium-DAO

[![npm version](https://badge.fury.io/js/exothium-dao.svg)](https://badge.fury.io/js/exothium-dao)

Exothium-DAO is a JavaScript library that allows developers to interact with the Exothium DAO core contracts on Starknet.
Every project that intends to interact with game contracts or DAO contracts can use this library to quickly and easily interact with the,.

## Goals
- ✅ Allow developers to easily interact with the Exothium DAO core contracts on Starknet.
- ✅ Lightweight and easy to use.
- ✅ Open source and free to use.

## Future Goals
- Add Dao contract mechanics
- Add ExoWorld game contracts mechanics

## Installation

```bash
npm install exothium-dao
```

## Usage

To connect a wallet (e.g. Braavos or ArgentX), you need to use the `starknetConnect` function.

```javascript
    import {starknetConnect, starknetDisconnect, ownerOfExothian} from 'exothium-dao';

    const connect = async () => {
        await starknetConnect();
    }
```

To disconnect a wallet, you need to use the `starknetDisconnect` function.

```javascript
const disconnect = async () => {
    await starknetDisconnect();
}
```

To get the owner of an Exothian, you need to use the `ownerOfExothian` function.

```javascript
const owner = await ownerOfExothian(1); //get owner of Exothian with id 1
```






