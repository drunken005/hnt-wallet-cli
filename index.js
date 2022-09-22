const fs           = require("fs");
const _            = require("lodash");
const CONSTANT     = require("./common/constant");
const HeliumWallet = require("./src/helium_wallet");
const path         = require("path");


const outPath = CONSTANT.DEFAULT_WALLET_OPTIONS.outputDir;

const writeWallets = (file, wallets) => {
    if (!wallets.length) {
        return;
    }
    if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath);
    }
    fs.writeFileSync(path.join(outPath, file), `[\n \t${wallets.join(", \n \t")}\n]`);
    console.log(`\nThe wallet is created, a total of ${wallets.length} wallets are created. output to file> "${path.join(outPath, file)}"`);
};

const create = async (options) => {
    const input           = _.assign({}, CONSTANT.DEFAULT_WALLET_OPTIONS, options);
    const encryptedWallet = [];
    const plaintextWallet = [];
    for (let i of new Array(Number(input.length))) {
        try {
            let wallet      = await HeliumWallet.createWallet(input.type);
            wallet.mnemonic = wallet.mnemonic.join(" ");
            if (input.password) {
                wallet.key = HeliumWallet.encodeMnemonic(wallet.mnemonic, input.password);
                encryptedWallet.push(JSON.stringify(_.pick(wallet, ["address", "key"])));
            }
            console.log(`Created wallet : ${wallet.address}`);
            plaintextWallet.push(JSON.stringify(_.pick(wallet, ["address", "mnemonic", "seed"])));
        } catch (e) {
            console.log(e.message);
            break;
        }
    }

    writeWallets(input.encrypted, encryptedWallet);
    writeWallets(input.plaintext, plaintextWallet);
};

const importWallet = async (mnemonic) => {
    mnemonic = mnemonic.toLowerCase();
    return await HeliumWallet.importWallet(mnemonic);
};

const encrypt = async (mnemonic, password) => {
    mnemonic   = mnemonic.toLowerCase();
    let wallet = await HeliumWallet.importWallet(mnemonic);
    if (!!wallet)
        wallet.mnemonic = HeliumWallet.encodeMnemonic(wallet.mnemonic, password);
    return wallet;
};

const decrypt = async (encryptMnemonic, password) => {
    try {
        let mnemonic = HeliumWallet.decodeMnemonic(encryptMnemonic, password);
        if (!mnemonic) {
            return console.log("Encrypt mnemonic or password error.");
        }
        return await HeliumWallet.importWallet(mnemonic);
    } catch (e) {
        console.log("Password error.");
    }


};

module.exports = {
    create,
    importWallet,
    encrypt,
    decrypt,
};