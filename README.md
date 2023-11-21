# PM2.5 Platform

PM2.5 Platform offers you insights on PM2.5 indicators of your choice. The data is powered by [PM2.5 Open Data](https://pm25.lass-net.org/)

## Implementation details

### Libraries used

- [PNPM](https://pnpm.io/) - as package manager
- [Next.js](https://nextjs.org/docs) - React.js framework - using the /pages format
- [SWR](https://swr.vercel.app/) - for making the HTTP request to retrieve/update the data
- [Chakra-UI](https://chakra-ui.com) - servers as component library that allows you to build beautiful, responsive and accessible UIs
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress) - testing library for integration tests
- [Jest](https://jestjs.io/docs/getting-started#using-typescript) - testing framework

### Getting started

To run the server, run the commands below. Once they have been ran, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
# development server
pnpm run dev

# production server
pnpm run start

```

### Testing

Cypress and Jest are configured for integration tests and unit test.
When running Cypress tests, firstly you need to start your server and then run the bellow command.

```bash
# integration tests
pnpm run test:e2e

# unit tests
pnpm run test
```

### API usage

The data is retrieved from [PM2.5 Open data API](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0).

## Future improvements

- Scale hero banner to be full width
- Review caching login
- Add tests for loading states
- Once the API allows requests from our app by solving the CORS issues, remove the need to use API Router
- Change date on project page to be human readable
- On Projects page, implement the logic to return 404 if the user tries to navigate to a project that is not part of the project lists
