# HR Manager

HR *(Human Resource)* Manager is a simple Javascript application where you can bascially search employees or utilize CRUD features (Create, Read, Update, Delete) in a prototype database *([JSON-server](https://www.npmjs.com/package/json-server))*.

>*All of data within the database is virtual (see [Public API](https://random-data-api.com/))*.

## Motivation
This is my first software engineering project at Flatiron School. I was always curious about the "behind curtain" process of an application on a web broswer. After working on this small project, I acquired basic understandings of "how" things work and now I am more interested about the back-end side of the software engineering.

## Features
- To search an employee, enter employee's ID on the `search bar` on top right corner and click `Search` button (_Browser will scroll onto the matching ID employee_).

- To view employees by their first name alphabetically, click `Sort By First Name` button on top right corner.

- To register new employee, enter new employee's information on the employee register and click `register` button.

- To edit employee's information, click on `Edit` button, the employee container will then turn in red indicating that you are currently in **Edit Mode**. You can exit the Edit Mode by pressing `Escape (Esc)` on your keyboard. Enter new information and click `Update` button.

- To delete employee from the database, click `Delete` button on right bottom of the employee's container.

- A timer (only displays in second) is locateed on top left corner for my current coding bootcamp's practice purpose.

## Description
- HR Manager is built in a plain structure as simple as `Fetch()` -> `JSON.server` -> `.then()` -> displays data on the current web browser as its core functionality has a sole purpose, **to communicate with the database.**

- A search bar is a HTML `<form>`, accepts maximum of 4 digits number and consists of one `submit` event listener with a callback function.

- Updating new information is accomplished by using `PATCH` method of `Fetch API`.

- External CSS file to enhances visual performance.

- Only vanilla JavaScript is used for this project.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contributions
1. Resources from Flatiron School Software Engineering Course.
2. Publicly available articles, lectures, videos from the Internet.

## References
1. Public API -> [Random Data API](https://random-data-api.com/)

2. Database -> [JSON-server](https://www.npmjs.com/package/json-server)

## Creator
Jack Kim (myself)

For any questions, feedbacks, you can email me [jmjkim00@icloud.com]()

My personal dev blog [https://dev.to/jmjkim]()
