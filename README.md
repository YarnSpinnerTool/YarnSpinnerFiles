# Yarn Spinner Files URL Redirector

This repo contains an Azure Functions application that redirects queries to a publicly-accessible Azure Storage Container. It's intended for creating nicer-looking URLs: that is, `https://downloads.yarnspinner.dev/get/X` will redirect to `https://(container URL)/X`.

The application is currently hosted at https://downloads.yarnspinner.dev.

The application has the following settings that can be configured:

- `FilesStorageAccountBase`: The base URL that all `/get` requests will be appended to, before redirecting to the result. (The application does a simple string concatenation, so this URL must end in a `/`.)
- `MainSiteUrl`: The URL that requests for `/` will be redirected to.

