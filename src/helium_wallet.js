const _            = require("lodash");
const english_json = require("./wordlists/english.json");
const {
          Keypair,
          utils,
      }            = require("@helium/crypto");
const {
          Util,
          AccountUtils,
      }            = require("dplatform_plugins");

class HeliumWallet {

    static async importWallet(mnemonic) {
        const _mnemonic = _.isArray(mnemonic) ? mnemonic : mnemonic.split(" ");
        try {
            const account = await Keypair.fromWords(_mnemonic);
            return {
                address:  account.address.b58,
                mnemonic: mnemonic,
            };
        } catch (e) {
            if (e.message === "invalid checksum") {
                return console.log("Mnemonic error.");
            }
        }
    }

    static async createWallet(seed) {
        if (!_.includes(["bip39", "mobile"], seed)) {
            throw new Error("Wallet seed type only support \"bip39\" and \"mobile\"");
        }
        const entropyBytes = (16 / 12) * 12;
        const entropy      = await utils.randomBytes(entropyBytes);
        const entropyBits  = utils.bytesToBinary([].slice.call(entropy));
        const checksumBits = utils.deriveChecksumBits(entropy);
        const bits         = entropyBits + checksumBits;
        const chunks       = bits.match(/(.{1,11})/g) || [];

        const words  = chunks.map((binary, index) => {
            if (seed === "mobile" && index === chunks.length - 1) {
                binary = binary.slice(0, 7) + "0000";
            }
            return english_json[utils.binaryToByte(binary)];
        });
        const wallet = await this.importWallet(words);
        return _.extend(wallet, {seed});
    }

    static decodeMnemonic(mnemonic, password) {
        return Util.decrypt(mnemonic, AccountUtils.sha256(password));
    }

    static encodeMnemonic(mnemonic, password) {
        return Util.encrypt(mnemonic, AccountUtils.sha256(password));
    }

}

module.exports = HeliumWallet;