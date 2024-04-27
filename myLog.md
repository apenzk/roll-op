./rollop --clean --name=myTestnet --preset=dev --config=config.toml.example devnet

following starts network but sometimes the network is not fully responsive
./rollop --name=myTestnet --preset=dev --config=config.toml.example devnet

to check sending a tx
cast send   --from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266   --private-key ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80   --rpc-url http://127.0.0.1:9545   --value 1ether   0x3fAB184622Dc19b6109349B94811493BF2a45362

to check balances run 
npm myTestScripts.js

./rollop explorer --config=config.toml.example





