import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainerClient } from "../downloadBlob";

// Redirects to FilesStorageAccountBase+X when a request is made for /get/X.

export async function downloadFile(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const urlBase = process.env['FilesStorageAccountBase'];

    context.log(`Get File: ${request.params.file}`);
    
    const containerClient = await getContainerClient();

    try {
        const blobClient = containerClient.getBlobClient(request.params.file);
    
        const blobBuffer = await blobClient.downloadToBuffer();
        const properties = await blobClient.getProperties();
    
        return {
    
            body: blobBuffer,
            headers: {
                'Content-Type': properties.contentType
            }
        };

    } catch (e) {
        return {
            status: 404,
            body: "Not found",
        }
    }

};

app.http('get', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: downloadFile,
    route: 'get/{*file}'
});
