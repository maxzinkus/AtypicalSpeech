// Azure Storage dependency
const {
  StorageSharedKeyCredential,
  BlockBlobClient,
} = require("@azure/storage-blob");

const config = require('config/config.json');

// Azure Storage resource name
const accountName = config.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error("Azure Storage accountName not found");

// Azure Storage resource key
const accountKey = config.AZURE_STORAGE_ACCOUNT_KEY;
if (!accountKey) throw Error("Azure Storage accountKey not found");

// Create credential
const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const baseUrl = `https://${accountName}.blob.core.windows.net`;
const containerName = `archive`;
const blobName = `audio-file-name-here`;

const fileContentsAsString = "Hello, World!";

async function main() {
  try {

    // create blob from BlockBlobClient
    const blockBlobClient = new BlockBlobClient(
      `${baseUrl}/${containerName}/${blobName}`,
      sharedKeyCredential
    );

    // Upload data to the blob
    await blockBlobClient.upload(
      fileContentsAsString,
      fileContentsAsString.length
    );
    console.log(`blob ${blockBlobClient.url} created`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

main()
  .then(() => console.log(`done`))
  .catch((ex) => console.log(ex.message));
