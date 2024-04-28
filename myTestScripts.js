const { ethers, JsonRpcProvider } = require('ethers');

// Define the RPC URL from your command; this should match your local Ethereum network
const rpcUrl = "http://127.0.0.1:9545";

// let lastLessThanEthValue = BigInt(0);
let lastWeiRemainder = {};


async function main() {
    try {
        // Check balances before sending Ether
        await checkSeveralBalances();

        // Send Ether and wait for it to complete
        await sendEther();

        // Check balances again after the transaction has been mined
        await checkSeveralBalances();

        await getChainId();
    } catch (error) {
        console.error('An error occurred:', error);
    }


}

async function checkSeveralBalances() {


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
            const gasPrice = 1000001;
            const balance = await provider.getBalance(address);
            const ethValue = balance / BigInt(10**18);
            const WeiRemainder = balance - ethValue * BigInt(10**18);
            console.log(`The balance of address ${address} is: ${balance / BigInt(10**18)} ETH`);
            console.log(`The remainder balance (less than 1 ETH) is: ${WeiRemainder} wei`);
    
            if (lastWeiRemainder[address] && lastWeiRemainder[address] > 0 && lastWeiRemainder[address]!= WeiRemainder) {
                console.log(`lastWeiRemainder = ${lastWeiRemainder[address]}`);
                console.log(`weiRemainder     = ${WeiRemainder}`);
                console.log(`Assuming constant gasPrice=${gasPrice}, this has taken : ${(lastWeiRemainder[address] - WeiRemainder)/BigInt(gasPrice)} gas `);
            }
    
            lastWeiRemainder[address] = WeiRemainder;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    addresses.forEach(checkBalance);

}

// Array to store gas prices
let gasPrices = [];

async function sendEther() {
    const fromAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const privateKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const recipientAddress = "0x3fAB184622Dc19b6109349B94811493BF2a45362";
    const amountEther = "1.0";

    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
        to: recipientAddress,
        value: ethers.parseEther(amountEther),
        gasLimit: 20511 // Setting custom gas limit
    };

    try {
        console.log("Sending transaction...");
        const txResponse = await wallet.sendTransaction(tx);
        console.log(`Transaction hash: ${txResponse.hash}`);
        const receipt = await txResponse.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
        console.log(`Gas used: ${receipt.gasUsed.toString()} units`);

        // Safely access gasPrice
        const gasPriceUsed = receipt.effectiveGasPrice || txResponse.gasPrice;
        if (gasPriceUsed) {
            console.log(`Gas price used: ${gasPriceUsed.toString()} wei`);
        } else {
            console.log("No gas price available in the transaction receipt.");
        }

        // Print the entire transaction receipt
        console.log("Transaction Receipt:");
        console.log(receipt);

    } catch (error) {
        console.error('Error sending ether:', error);
    }
}




// Async function to get the chain ID
async function getChainId() {
    const provider = new JsonRpcProvider(rpcUrl);

    const network = await provider.getNetwork();
    console.log('Chain ID:', network.chainId);
}

main();