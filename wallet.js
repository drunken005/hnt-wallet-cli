const {Command} = require("commander");
const _         = require("lodash");
const program   = new Command();
const wallet    = require("./index");


program
    .name("wallet")
    .description("CLI to helium wallet tools")
    .version("0.1.0", '-v, --version', 'output the current version');


program.command("create")
    .description("Create bip39 or mobile wallet mnemonics in batches, support encryption")
    .option("-t, --type <string>", "Wallet type default 'mobile', support 'mobile' and 'bip39'")
    .option("-l, --length <number>", "Number of wallets created, default 1")
    .option("-p, --password <string>", "Wallet mnemonic encryption password")
    .action(async (input) => {
        input.length = !!input.length ? input.length : 1;
        if (_.isNaN(Number(input.length))) {
            return console.error(`Inputs are invalid "length"`, input.length);
        }
        await wallet.create(input);
    });


program.command("import")
    .description("Import bip39 or mobile wallet mnemonic")
    .argument("<mnemonic>", "Wallet mnemonic strings")
    .action(async (input) => {
        const _wallet = await wallet.importWallet(input);
        if (!!_wallet)
            console.log(_wallet);
    });


program.command("encrypt")
    .description("Encrypt the mnemonic return address and encrypted string")
    .argument("<mnemonic>", "Wallet mnemonic strings")
    .requiredOption("-p, --password <string>", "Wallet mnemonic encryption password")
    .action(async (input, options) => {
        const _wallet = await wallet.encrypt(input, options.password);
        if (!!_wallet)
            console.log(_wallet);
    });


program.command("decrypt")
    .description("Decrypt the encrypted mnemonic return address and mnemonic")
    .argument("<encrypted-mnemonic>", "Mnemonic encrypted string")
    .requiredOption("-p, --password <string>", "Wallet mnemonic encryption password")
    .action(async (input, options) => {
        const _wallet = await wallet.decrypt(input, options.password);
        if (!!_wallet)
            console.log(_wallet);
    });

program.parse();

