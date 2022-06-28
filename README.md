<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Fix it Up Web API with Typescript

Fix it Up Backend Application developed with [Typescript](https://www.typescriptlang.org/) and using the framework of [Nest](https://github.com/nestjs/nest). 
Persistence layer is implemented using [TypeORM](https://typeorm.io/) with MySQL Database.
Object Mapping is based on [AutoMapper TypeScript](https://automapperts.netlify.app/).
The API has been deployed to IBM Cloud using Cloud Foundry, and uses database services from Amazon Web Services.

## Installation

```bash
$ npm install
```

## Requisites
- https://dev.mysql.com/downloads/mysql
- https://www.mysql.com/products/workbench
- https://nestjs.com/

## Install NestJS
```
$ npm i -g @nestjs/cli
$ nest --version
```

## Install Dependencies

```
$ npm i --save typeorm reflect-metadata mysql2
$ npm i --save @nestjs/typeorm @nestjs/cqrs
$ npm i --save typescript-result moment-timezone node-sql-reader
$ npm i @automapper/core @automapper/classes @automapper/nestjs @automapper/types
```

## Install Dev Dependencies

```
$ npm i --save-dev ts-node @types/node npm-run-all
```

## Scripts at package.json
Add typeorm command under scripts section in package.json
```
"scripts": {
    ...
    "typeorm": "typeorm-ts-node-commonjs"
}
```

## Create a module

```
$ nest g resource customers
```

## Environment variables

```
FIXITUP_DDD_NEST_MYSQL=mysql://{user}:{password}@{host}:{port}/{database}
FIXITUP_DDD_NEST_MYSQL=mysql://root:root@localhost:3306/fixitup-ddd-nest
ENVIRONMENT=local
ENVIRONMENT=prod
```
Note: Password must be URL encoded, %25 is the url encoding of %.

## Fix issue with MySQL 8

Client does not support authentication protocol requested by server; consider upgrading MySQL client.
To fix it, run the following command changing the values with your credentials:

```
ALTER USER '{user}'@'{host}' IDENTIFIED WITH mysql_native_password BY '{password}'
FLUSH PRIVILEGES;
```

### Example:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
FLUSH PRIVILEGES;
```
## Migrations

```
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/InitialSchema
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/MasterData
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/UserEmailUpdate
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/UserEmailReupdate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Deployment to IBM Cloud Foundry

This backend application has been deployed to [IBM Cloud Foundry](https://www.ibm.com/cloud) while using database services from [Amazon Web Services](https://aws.amazon.com/).

## IBM Cloud

```
https://cloud.ibm.com/login
```

## Download Cloud Foundry CLI

```
https://github.com/cloudfoundry/cli/releases
```

## Deployment

```
$ npm run build
$ cd dist
$ cf push --no-start
- format: cf set-env {app-name} {var-name} {var-value}
$ cf set-env fixitup-ddd-nest ENVIRONMENT prod
$ cf set-env fixitup-ddd-nest FIXITUP_DDD_NEST_MYSQL mysql://{user}:{web service}:3306/fixitup-ddd-nest
$ cf push
```

## Tip - Cloud Foundry Environment Variables

```
Strings containing the following characters must be quoted:
:, {, }, [, ], ,, &, *, #, ?, |, -, <, >, =, !, %, @, \.
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
