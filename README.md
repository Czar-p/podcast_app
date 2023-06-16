# Podcaster

Welcome to Podcaster, a Next.js project for podcast management.

## Getting Started

### Development

To start the project in development mode, run the following commands:

```shell
npm install
npm run dev
```

This will install the dependencies and start the development server.

### Production

To start the project in a production environment, follow these steps:

1. Build the Docker image:

```shell
docker build -t podcaster .
```

2. Run the Docker container:

```shell
docker run -d -p 3000:3000 podcaster
```

This will create and run the Docker container with the Podcaster application.

## Technologies Used

Podcaster is built using the following technologies:

- Next.js: A React framework for building server-side rendered applications.
- Redux: A predictable state management library for JavaScript applications. It is used in this project to manage global application state.
- crypto-js and Buffer: Utility libraries used for various functions in the project.
- fast-xml-parser: A library used for parsing XML into JSON format.
- Jest: A JavaScript testing framework used for unit and integration testing.

## Testing

To run the tests for Podcaster, execute the following command:

```shell
npm test
```

**Disclaimer:** Please note that only integration tests have been included in this project. Since the components are small and straightforward, the most relevant aspects can be observed in integration tests. Adding unit tests for such small components would not provide significant additional insights.

---

**Disclaimer:** This project is intended to showcase technical skills
