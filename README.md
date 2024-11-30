# Shatbox Beta

This repository is for testing the Azure Web PubSub service with Node.js. It contains the server-side code for the project.

## Overview

The server-side code in this repository is responsible for managing connections, broadcasting messages, and handling events using Azure Web PubSub.

## Client-Side Code

The client-side code can be found in the same repository under the directory: `az_webpubsub_client_beta`.

## Getting Started

To get started with the server-side code, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shatbox_beta.git
    ```
2. Navigate to the server directory:
    ```bash
    cd shatbox_beta
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Configure your Azure Web PubSub connection string in the `.env` file:
    ```env
    WEBPUBSUB_CONNECTION_STRING=your_connection_string_here
    ```
5. Start the server:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
