import {
    BlobServiceClient,
    StorageSharedKeyCredential
} from '@azure/storage-blob';

const accountName = process.env.FilesStorageAccountName as string;
const accountKey = process.env.FilesStorageAccountKey as string;
const containerName = process.env.FilesStorageAccountContainerName as string;
if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');
if (!containerName) throw Error('Azure Storage container name not found');

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

const blobServiceClient = new BlobServiceClient(
`https://${accountName}.blob.core.windows.net`,
sharedKeyCredential
);

export async function getContainerClient() {
    
    // create container client
    const containerClient = await blobServiceClient.getContainerClient(
      containerName
    );

    return containerClient;
}
  

export async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}