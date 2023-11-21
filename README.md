# PM2.5 Platform

PM2.5 Platform offers you insights on PM2.5 indicators of your choice. The data is powered by [PM2.5 Open Data](https://pm25.lass-net.org/)

## Getting Started

To run the server:

```bash
# development server
pnpm run dev

# production server
pnpm run start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Cypress and Jest are configured for integration tests and unit test.

```bash
# integration tests
pnpm run test:e2e

# unit tests
pnpm run test
```

## API usage

The data is retrieved from [PM2.5 Open data API](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0).

## Libraries used

- [PNPM](https://pnpm.io/) - as package manager
- [SWR](https://swr.vercel.app/) - for making the HTTP request to retrieve/update the data
- [Chakra-UI](https://chakra-ui.com) - servers as component library that allows you to build beautiful, responsive and accessible UIs
