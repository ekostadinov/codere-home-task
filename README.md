# Codere Application Playwright Tests
Automated tests for the Codere application using the Playwright framework.

## Prerequisites
Before running the tests, make sure you have the following dependencies installed:

* Node.js
* npm (Node Package Manager)

## Installation
Clone the repository.
Navigate to the project directory.

Run the following command to install the required dependencies:

* npm install
* npx playwright install (only once, if this is your first time setup)

### Setup local environment

- Create `.env` based on the `.env.example` file format => Add values for the needed keys.

## Running the Tests
To run the tests, execute the following command:

* npm run test

This command will trigger the test script defined in the package.json file, which runs the Playwright tests using the playwright test command.

By default, the tests are executed in Chromium browser. If you want to run the tests in a different browser or with additional options, you can modify the test configuration in the playwright.config.js file.

### Test Reports
After running the tests, you can find the test reports in the ./test-results directory. The reports provide detailed information about the test execution, including passed and failed tests, screenshots, and logs.