import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Redirects to MainSiteUrl when a request is made for the root URL.

export async function redirectToSite(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const redirectUrl = process.env['MainSiteUrl'];
    
    return {
        // 301 Moved Permanently; the content is at this URL and not here
        status: 301,
        headers: {
            'Location': redirectUrl
        }
    };
};

app.http('redirectToSite', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: redirectToSite,
    route: '/',
});
