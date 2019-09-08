# City Pantry Operations Monitor

This simple front-end application displays on the `/orders` page information provided 
by a back-end service. The page is can be used by a customer service agent to liaise 
with customers, and it has to be considered just a functional Minimum Viable Product (fMVP).

The `/orders` page, on load, fetches the data from the backend endpoint and displays it 
in a table. More data can be uploaded on request.

## Miscellanea of comments and TODO's

### Style

The style of the app is absolutely plain, and no style package (bootstrap or Material Design) 
has been used. This has been done on purpose with the aim of:
- saving time for what is supposed to be just a functional MVP
- staying consistent with the homepage component, whose style is plain
- avoid throw-away work before a consistent style will be choosen with product owners and designers

### Loading more data

Further data is loaded on the `/orders` page by clicking a button. This solution is not ideal 
as it requires an explicit action from the user whilst data could be loaded automatically (e.g. 
infinite scroll, table pagination, ...). Yet, a more UX-friendly solution was not 
implemented because the next point would need to be addressed first. 

### Data and Back-end
Although it was possible to modify the backend in the context of this project, we decided not to 
do so as a complete refactoring is needed more than few minor modifictions. Due to the nature itself
of the app, it would beneficial to have the following endpoints:
- an `/orderSummaries` supporting GET requests returning a list of `OrderSummary`. An `OrderSummary`
would be a leaner version of the resources returned currently by the back-end, containg whatever 
information should be displayed on the orders list page, e.g., id, customer, vendor and status.
- `/orderDetails/:id` supporting GET requests returning an `orderDetail`. An `orderDetails`
would be a fully-detailed version of the resource returned currently by the back-end, containg any 
information relative to an order.
This implementation would allow a much more efficient communication between front- and back-end.

### User Interface improvements
A more friendly version of the UI would be give by:
-  an initial table view, similar to the current one, but with less details (potentially the one 
exposed by a `OrderSummary`), 
- a details page displaying the full range of details stored by the back-end, nicely grouped in 
sections (status section, payment section, map section). In particular, a map could be displayed 
with the positions of customer, vendor and driver. 

### Testing
A complete testing setting would include:
- unit tests, in `xxx.unit.spec.ts` files, one per component/service/directive/pipe, containing 
a suite (i.e., `describe`) per method, and possibly many tests in it. These tests should be quick
and indipendent from the UI (i.e., `NO_ERROR_SCHEMA`). We provided some.
- integration tests, in `xxx.integration.spec.ts` files, one per component/service/directive/pipe, 
asserting that the component methods and template behave as expected. We provided some.
- e2e/functional tests, in `xxx.e2e.spec.ts` files, one per acceptance criteria of each user story
or per bug, representing a flow as it would be for a final user.
Moreover, the following would need to be added:
- code coverage reports, e.g. `istanbul`.
- integration to a CI pipeline,
- agreed threshold of code coverage under which a build would fail.

### Error handling
No error handling was considered. As the app is a simple read application, the only
case to cover would be the inability to retrieve data from the back-end. Potentially error handling 
could be entirely ignored.

### Cross-device and cross-browser support
No cross-device support was considered. As the app is a support application, we may want to support
a single browser on extra-large desktop devices (the most commonly used in support environments), 
and ignore cross-device and cross-browser support entirely.

### WARN deprecated dependencies
The following dependecies are deprecated, and need to be updated:
- @angular/http@5.2.11
- extract-text-webpack-plugin@3.0.2
- browserslist@1.7.7
- hawk@3.1.3
- flatten@1.0.2
- boom@2.10.1
- cryptiles@2.0.5
- sntp@1.0.9
- hoek@2.16.3
This was not done as it may have requested updating the major version of Angular, possibly from 5 to 8.

### Missing package-lock.json

The file package-lock.json was added, as it should always be committed. Not doing this may have 
consequences not only on the technical side but also on the legal/licence side.

### Missing peer dependencies

ajv-keywords@3.4.1 requires a peer of ajv@^6.9.1 but none is installed. It must be installed.

### Vulnerabilities

31 vulnerabilities (15 low, 7 moderate, 9 high) are found, and need to be fixed.
