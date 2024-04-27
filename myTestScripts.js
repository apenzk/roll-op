const { ethers, JsonRpcProvider } = require('ethers');

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