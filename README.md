# hnt-wallet-cli

 Helium wallet supports batch generation of mnemonics and addresses, import of mnemonics, encryption and decryption of mnemonics

## Environment
* NodeJs: v14.17.3
* npm: 6.14.13

## Install
```bash
    npm install
```

## Usage
```shell
    node wallet --help
    
    Usage: wallet [options] [command]

    CLI to helium wallet tools
    
    Options:
      -V, --version                           output the version number
      -h, --help                              display help for command
    
    Commands:
      create [options]                        Create bip39 or mobile wallet mnemonics in batches, support encryption
      import <string>                         Import bip39 or mobile wallet mnemonic
      encrypt [options] <mnemonic>            Encrypt the mnemonic return address and encrypted string
      decrypt [options] <encrypted-mnemonic>  Decrypt the encrypted mnemonic return address and mnemonic
      help [command]                          display help for command

```

### Create wallets in batches
```shell
    node wallet create -t mobile -l 10
    
    # output: 
    # The wallet is created, a total of 10 wallets are created. output to file> "temp/plaintext_wallet.json"
    
    
   # See more help
   node wallet create -h
```

### Create wallets in bulk and encrypt mnemonics
```shell
  node wallet create -t mobile -l 20 -p passwordstring
  
  # output:
  # The wallet is created, a total of 20 wallets are created. output to file> "temp/encrypted_wallet.json"
  # The wallet is created, a total of 20 wallets are created. output to file> "temp/plaintext_wallet.json"
  
  # See more help
   node wallet create -h
```

### Import wallet
```shell
    node wallet import "word1 word2 ...."
   
   # output:
   # {
   #    address:"xxxx", 
   #    mnemonic: "word1 word2 ...."
   # }
   
   # See more help
   node wallet import -h
```

### Encrypt wallet
```shell
    node wallet encrypt "word1 word2 " -p "passwordstring"
    
   # output:
   # {
   #    address:"xxxx", 
   #    mnemonic: "encrypted string"
   # }
   
   # See more help
   node wallet encrypt -h
    
```

### Decrypt wallet
```shell
    node wallet decrypt "encrypted string" -p "passwordstring"
    
   # output:
   # {
   #    address:"xxxx", 
   #    mnemonic: "word1 word2 ...."
   # }
   
   # See more help
   node wallet decrypt -h
    
```