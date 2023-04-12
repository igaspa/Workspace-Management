# workspace_management#
 <a name="readme-top"></a>

<h1 align="center">Workspace Management</h1>

  <h3>Table of Contents</h3>
  <ol>
    <li>
      <a href="#about-the-app">About The App</a>
      <ul>
        <li><a href="#notable-backend-features">Backend</a></li>
        <li><a href="#notable-frontend-features">Frontend</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-description">API Description</a></li>
  </ol>

## About The App

The Workspace Management is a group project assigned during the Agilathon 2023 dev internship.<br>
Workspace Management will be used to reserve workspaces in the office. Included workspaces are: phone booth, conference room and desks.

### Backend Features:
* REST API
* PostgreSQL database
* Cron job scheduling for repeating functions (e.g. notifications)
* Email notifications for all reservations
* Ability to reserve, update reservation or cancel workspace reservation
* Ability to permanently reserve desk workspaces
* Authorization based on three roles: administrator, employee and lead

#### Backend Built With:


- [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
- [![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
- [![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/)
- [![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/products/docker-desktop/)
- [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



#### Frontend Built With:

- [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)
* Node Package Manager
  ```
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```
   git clone https://github.com/agilathon/workspace_management.git
   ```
2. Install NPM packages (In both the server and client subfolders)
   ```
   npm install
   ```
3. Rename and modify the .env.example file in the working directory, to suit your needs

4. In the server folder run the following command to setup the database containers and volumes:
   ```
   docker-compose --env-file .env.name  up -d
   ```

5. In the server folder run the following commands to migrate and seed the database:
   ```
    npm run migrate:{env}
    npm run seed:{env}
   ```
   
6. In the server folder run the following command to start the backend:
   ```
    npm run start:{env}
   ```

   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## API Description
There are two ways to review the API and its possibilities:
* Swagger UI
* Postman Collection


### Swagger UI
After starting the server (see -> <a href="#installation">Installation</a>), you simply need to navigate to the following URL:
   ```
    http://localhost:{port}/api-docs
   ```

### Postman Collection
A postman collection is included in the working directory. It contains a list of all possible requests that can be run as a whole.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
