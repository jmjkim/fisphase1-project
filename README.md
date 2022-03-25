# HR Manager

HR *(Human Resource)* Manager is a simple Javascript application where you can search, view and update employee's information on database (*[JSON-server](https://www.npmjs.com/package/json-server)*).

>All of data within the database is virtual (see [Public API](https://random-data-api.com/) reference).

## Features
- A **search bar** on top right corner, you can enter employee's ID then it will scroll onto the target employee.

- Click on **Edit** button will turn employee box in red which indicates you are currently in Edit Mode. You can exit the Edit Mode by pressing **Escape (Esc)**. Enter new information and click on **Update** to update employee's new information.

> Creating, deleting features are not currently implemented.

## Description
- HR Manager is built in a plain structure as simple as `Fetch()` -> `JSON.server` -> `.then()` -> displays data on the current web browser as its core functionality has a sole purpose, **to communicate with the database.**

- A search bar is a HTML `<form>`, accepts maximum of 4 digits number and consists of one `submit` event listener with a callback function.

- Updating new information is accomplished by using `PATCH` method of `Fetch API`.

- External CSS file to enhances visual performance.
## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contributions
- Resources from Flatiron School Software Engineering Course.
- Publicly available articles, lectures, videos from the Internet.

## References
1. Public API -> [Random Data API](https://random-data-api.com/)

2. Database -> [JSON-server](https://www.npmjs.com/package/json-server)

## Creator
Jack Kim (myself)

For any questions, feedbacks, you can email me [jmjkim00@icloud.com]()
