# Avoid infinite retries in Cloud Functions

This sample demonstrates how to avoid infinite retries in Cloud Functions by
only executing within a certain time period after the triggering event.

Explore further For detailed documentation that includes this code sample, see
the following:

- Enable event-driven function retries
- Enable event-driven function retries Code

To authenticate to Cloud Run functions, set up Application Default Credentials.
For more information, see Set up authentication for a local development
environment.

```javascript
const functions = require('@google-cloud/functions-framework');

/**
 * Cloud Event Function that only executes within
 * a certain time period after the triggering event
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
functions.cloudEvent('avoidInfiniteRetries', (event, callback) => {
  const eventAge = Date.now() - Date.parse(event.time);
  const eventMaxAge = 10000;

  // Ignore events that are too old
  if (eventAge > eventMaxAge) {
    console.log(`Dropping event ${event} with age ${eventAge} ms.`);
    callback();
    return;
  }

  // Do what the function is supposed to do
  console.log(`Processing event ${event} with age ${eventAge} ms.`);

  // Retry failed function executions
  const failed = false;
  if (failed) {
    callback('some error');
  } else {
    callback();
  }
});


Avoid infinite retries

Discards all events older than 10 seconds.

Explore further
For detailed documentation that includes this code sample, see the following:

Enable event-driven function retries
Enable event-driven function retries
Enable event-driven function retries (1st gen)
Code sample
C#
Go
Java
Node.js
PHP
Python
Ruby

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.





/**
 * Background Cloud Function that only executes within
 * a certain time period after the triggering event
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
exports.avoidInfiniteRetries = (event, callback) => {
  const eventAge = Date.now() - Date.parse(event.timestamp);
  const eventMaxAge = 10000;

  // Ignore events that are too old
  if (eventAge > eventMaxAge) {
    console.log(`Dropping event ${event} with age ${eventAge} ms.`);
    callback();
    return;
  }

  // Do what the function is supposed to do
  console.log(`Processing event ${event} with age ${eventAge} ms.`);

  // Retry failed function executions
  const failed = false;
  if (failed) {
    callback('some error');
  } else {
    callback();
  }
};
```
