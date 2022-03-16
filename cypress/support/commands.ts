// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  // Your config from Firebase Console
  apiKey: Cypress.env("VITE_API_KEY"),
  authDomain: Cypress.env("VITE_AUTH_DOMAIN"),
  projectId: Cypress.env("VITE_PROJECT_ID"),
  storageBucket: Cypress.env("VITE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("VITE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("VITE_APP_ID"),
  measurementId: Cypress.env("VITE_MEASUREMENT_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
