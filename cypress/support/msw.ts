import { http, type RequestHandler } from "msw";
import { setupWorker, type SetupWorker } from "msw/browser";
import { handlers } from "../../mocks/handlers";

declare global {
  namespace Cypress {
    interface Chainable {
      interceptRequest(...handlers: RequestHandler[]): void;
    }
  }
}

let worker: SetupWorker;

before(() => {
  worker = setupWorker();
  cy.wrap(worker.start({ onUnhandledRequest: "bypass" }), { log: false });
});

Cypress.on("test:before:run", () => {
  if (!worker) return;
  worker.resetHandlers();
});

Cypress.Commands.add("interceptRequest", (...handlers: RequestHandler[]) => {
  if (!worker) return;
  worker.use(...handlers);
});
