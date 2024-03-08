# Yarn Spinner Files URL Redirector

This repo contains an Azure Functions application that acts as a frontend to a publicly-accessible Azure Storage Container. It's intended for creating nicer-looking URLs: that is, `https://downloads.yarnspinner.dev/get/X` will fetch data from to `https://ACCOUNT.blob.core.windows.net/CONTAINER/X`.

The application is currently hosted at https://downloads.yarnspinner.dev.

The application has the following settings that can be configured:

- `MainSiteUrl`: The URL that requests for `/` will be redirected to.
- `FilesStorageAccountName`: The name of the storage account to fetch data from.
- `FilesStorageAccountContainerName`: The name of the container in the storage account.
- `FilesStorageAccountKey`: The access key for the container.

