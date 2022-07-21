# Interview Scheduler
Interview Scheduler is a single-page application (SPA) that allows users to book interviews between users and interviewers. 
Appointments can be selected between 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. Interviewer is chosen from a given list available. Saved appointment can be viewed along with the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Setup

Install dependencies with `npm install`.


## Running Webpack Development Server

```sh
npm start
```
## Running API server 

- Head to [Scheduler-API](https://github.com/diavolosz/scheduler-api) page
- fork and clone the repo to local

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- "axios": "^0.24.0",
- "classnames": "^2.2.6",
- "node-sass": "^4.14.1",
- "normalize.css": "^8.0.1",
- "react": "^16.9.0",
- "react-dom": "^16.9.0",
- "react-scripts": "3.0.0"

- main page
  !["main page"]()<br />
- create interview
  !["create interview"]()<br />
- delete interview
  !["delete interview"]()