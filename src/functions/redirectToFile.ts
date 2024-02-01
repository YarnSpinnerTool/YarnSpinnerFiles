import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Redirects to FilesStorageAccountBase+X when a request is made for /get/X.

export async function redirectToFile(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const urlBase = process.env['FilesStorageAccountBase'];
    const url = urlBase + request.params.file;

    return {
        // 302 Found; redirect to this URL, but querying this endpoint may
        // return a different URL in the future
        status: 302,
        headers: {
            'Location': url
        }
    };
};

app.http('get', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: redirectToFile,
    route: 'get/{file}'
});
