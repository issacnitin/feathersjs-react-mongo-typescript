import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import * as Services from './services/index';

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Express middleware to to host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Express middleware with a nicer error handler
app.use(express.errorHandler());
Services.register(app);

// Start the server
app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);