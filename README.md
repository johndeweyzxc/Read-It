## Read It, social media app

## What is Read It?

Read It, is a social media app where a user can create, read, update and delete a post. Users who wish to make a post will need an account. A user's account can be also be updated with the right credentials. User account deletion is under development.

## How does it work?

Read It, uses React to create a user interface, it uses the fetch api to fetch data from the backend server. The backend server is Express, it is the rest api of the application. The backend routes request and verifies user inputs. The rest api communicates with the mongo database to retrieve and manipulate documents, this includes the user profile information and the user's post information.

## How to run?

Before running ensure you are using the same version for dependencies. You can look at the package.json file for dependency information. After that you need to launch the mongodb server, the express api server and the react ui server. To launch mongodb read the README file in the db directory, for rest api read the README file in the api directory, do this also in the ui directory.

## Technologies used

<li>React JS v18.2.0</li>
<li>Express JS v4.18.1</li>
<li>Node v16.17.0</li>
<li>Mongo v6.0.1</li>

## Demo
