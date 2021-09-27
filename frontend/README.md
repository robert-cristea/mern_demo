# React Redux Login, Registration example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech stack

- React
- Redux/Redux-thunk
- Axios

## Set port

## Note:

Open `src/services/auth-header.js` and modify `return` statement for appropriate back-end (found in the tutorial).

```js
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { "x-access-token": user.accessToken }; // for Node.js Express back-end
  } else {
    return {};
  }
}
```

## Getting Started

1. Set port in .env

```
PORT=3000
```

2. Install packages

```
npm install
# or
yarn install
```

3. Run project

```
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
