
This repo contains an example React App...

[You can find the official TodoMVC tests to here.](https://github.com/tastejs/todomvc/blob/master/tests/test.js) [And here.](https://github.com/tastejs/todomvc/blob/master/tests/page.js) [And here.](https://github.com/tastejs/todomvc/blob/master/tests/testOperations.js)

## Help + Testing

The steps below will take you all the way through Cypress. It is assumed you have nothing installed except for node + git.

**If you get stuck, here is more help:**

* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://on.cypress.io)
* [Cypress CLI Tool Docs](https://github.com/cypress-io/cypress-cli)

### Guide to installing Cypress

[Follow these instructions to install Cypress.](https://on.cypress.io/guides/installing-and-running#section-installing)

### Clone this repo

```bash
## clone this repo to a local directory
git clone https://github.com/<your-username>/cypress-example-todomvc.git

## cd into the cloned repo
cd cypress-example-todomvc

## install the node_modules
npm install

## start the local webserver
npm start
```

The `npm start` script will spawn a webserver on port `8888` which hosts the TodoMVC app.

You can verify this by opening your browser and navigating to: [`http://localhost:8888`](http://localhost:8888)

You should see the TodoMVC app up and running. We are now ready to run Cypress tests.