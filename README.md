Sure! Here's an example of a README in English for your Discord bot base repository:

---

# Discord Bot Base

This is a base repository for creating Discord bots using Node.js. It provides the initial structure and necessary dependencies to start developing your own Discord bot.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, you will need to have Node.js installed on your machine. You can download it [here](https://nodejs.org/).

## Installation

To install the necessary dependencies, you can use either `npm` or `yarn`.

### Using npm

```bash
npm install
```

### Using yarn

```bash
yarn install
```

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and configure the required environment variables, such as your Discord bot token.

Example of the `.env` file:

```env
TOKEN = your_token_here
```

## Usage

After installing the dependencies and configuring the `.env` file, you can start the bot with the following command:

### Using npm

```bash
npm start
```

### Using yarn

```bash
yarn start
```

Your bot should now be online in the configured Discord server.

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This README provides a basic structure and the necessary instructions for other developers to set up and use your Discord bot base. Feel free to modify it as needed to suit the specifics of your project.