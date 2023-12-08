import 'dotenv/config'
import { readFileSync } from "fs";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { createRequire } from "module";
import { get } from 'http';
const require = createRequire(import.meta.url);
const fs = require('fs');
const process = require('process');


async function fetchMetada() {
    const response = await fetch(
        process.env.SFDC_ENDPOINT,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Authorization: Bearer ' + process.env.SFDC_TOKEN,
                "Content-Type": "application/json",
            }
        }
    );
    const data = await response.json();
    return data;
}

const metadata = await fetchMetada();

// If used on the BACKEND pass your 'secretKey'
const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "base-goerli", {
    secretKey: process.env.SECRET_KEY,
});
const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);

const nftsToMint = [];
metadata.forEach((coinaversary) => {
    let nftTitle = 'Happy ' + coinaversary.Coinaversary_In_Years__c +
        ' Year Coinaversary ' + coinaversary.First_Name__c + '!';
    let nftToMint = {
        name: nftTitle,
        // ... Any other metadata you want to include
    }
    nftsToMint.push(nftToMint);
});
console.log(nftsToMint);
//const mintedNFTs = await contract.erc721.mintBatchTo(process.env.WALLET_ADDRESS, metadatas);
