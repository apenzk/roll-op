const { ethers, JsonRpcProvider } = require('ethers');

async function main() {
    try {
        // Check balances before sending Ether
        await checkSeveralBalances();

        // Send Ether and wait for it to complete
        await sendEther();

        // Check balances again after the transaction has been mined
        await checkSeveralBalances();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function checkSeveralBalances() {

    // Define the RPC URL from your command; this should match your local Ethereum network
    const rpcUrl = "http://127.0.0.1:9545";

    // Initialize a provider using ethers.js connected to your local Ethereum network
    const provider = new JsonRpcProvider(rpcUrl);

    // Define the addresses you want to check the balance of
    const addresses = [
        "0x3fAB184622Dc19b6109349B94811493BF2a45362",
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        // Add more addresses here
    ];

    async function checkBalance(address) {
        try {
            const balance = await provider.getBalance(address);
            console.log(`The balance of address ${address} is: ${balance / BigInt(10**18)} ETH`);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    addresses.forEach(checkBalance);

}

async function sendEther() {
   // Configuration
   const fromAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
   const privateKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
   const rpcUrl = "http://127.0.0.1:9545";
   const recipientAddress = "0x3fAB184622Dc19b6109349B94811493BF2a45362";
   const amountEther = "1.0";  // Amount of ether to send

   // Connect to the RPC provider
   const provider = new JsonRpcProvider(rpcUrl);

   // Create a wallet instance from the private key and connect it to the provider
   const wallet = new ethers.Wallet(privateKey, provider);

   // Define the transaction
   const tx = {
       to: recipientAddress,
       // Convert the amount in ether to wei
       value: ethers.parseEther(amountEther)
   };

   try {
       console.log("Sending transaction...");
       const txResponse = await wallet.sendTransaction(tx);
       console.log(`Transaction hash: ${txResponse.hash}`);

       // Wait for the transaction to be mined
       const receipt = await txResponse.wait();
       console.log('Transaction confirmed in block:', receipt.blockNumber);
   } catch (error) {
       console.error('Error sending ether:', error);
   }
}

main();