# Youtube video explainer
https://youtu.be/H7bbRA6_z8w

## Using the Live Project

- The test page can be viewed at <https://slsg.pages.dev/>
- UserName: `calvint`
- Pass: `rfbwEp6E!CmNDbCcUi`

## Building the project

### Backend

- cd into backend, run `npm i`
- `sls deploy --aws-profile yourprofile` to deploy the stack
- get cognito values from aws USER_POOL_ID and CLIENT_ID
- Add values to .env file in frontend

### Frontend

- cd into frontend, run `npm i`
- Use Node v 22+
- Update .env file with
  - VITE_AWS_REST_API
  - VITE_AWS_COGNITO_POOL_ID
  - VITE_AWS_COGNITO_CLIENT_ID
- Run `npm run dev` to run the dev build

### Workflow

<img width="1254" height="1118" alt="Screenshot 2025-10-13 at 11 40 32" src="https://github.com/user-attachments/assets/26573257-88be-4d8c-b0ea-11a0e1f99e31" />

## Conditions

- [x] All application code must be written using Javascript. Typescript is acceptable as well. Backend application is written in Node.js and frontend application written in React

- [x] Backend AWS Infrastructure needs to be automated with IAC using Serverless Framework

- [x] The API Gateway REST API should store data in DynamoDB

- [x] There should be 4-5 lambdas that include the following CRUD functionality (Create, Read, Update, Delete) \*don't use service proxy integration directly to DynamoDB from API Gateway

- [x] Build the CI/CD pipeline to support multi-stage deployments e.g. dev, prod

- [x] The template should be fully working and documented

- [x] A public GitHub repository must be shared with frequent commits

- [x] A video should be recorded (<www.loom.com>) of you talking over the application code, IAC, and any additional areas you want to highlight in your solution to demonstrate additional skills
