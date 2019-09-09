---
title: Node.js Typescript & GraphQL환경에서 테스트 작성하기
date: "2019-09-09T22:12:03.284Z"
thumbnail: "/images/default.jpg"
description: ""
author: "grep"
tags: ["typescript", "tdd", "nodejs", "graphql"]
---
## Overview

개발자들은 느낄 겁니다. 몇 달만 지나도 새로운 프레임워크나 언어가 나오고, 개발 방향을 잡아주는 개발 방법론에도 트렌드가 있다는 것을 말이죠. 요즘은 TDD(Test Driven Development)가 큰 인기를 휩쓸고 있습니다. 

TDD는 간단하게 이야기해서 테스트가 개발을 이끈다고 해서, 테스트 코드를 먼저 짜고 그 다음 메인 코드를 짜는 방식으로 개발을 진행합니다. 테스트를 먼저 짜게 되면서 자연스럽게 예외 상황과 동작 방식을 생각하게 되어 메인 코드를 작성할 때 더 좋은 코드가 나올 수 있습니다. 또한 팀 내 개발자가 코드를 잘못 건드리더라도 테스트를 통과하지 못하기에 빠르게 문제 원인을 찾고 해결할 수 있습니다. 이는 사이드 이펙트를 줄이는데도 큰 도움이 될 것입니다. (전제 조건은 좋은 테스트 코드를 짜는 것입니다.)

## 클래스101이 테스트를 도입하게 된 계기

우리는 기술의 ‘안정성’과 ‘기능 개발’ 두 가지를 모두 잡기 위해 고군분투하고 있습니다. 하루에 한 번씩 서버와 웹을 전부 배포하고 있으며, 매일 새로운 기능들과 유지보수 작업이 이뤄지고 있습니다. 그러나 프로덕트 개발팀의 인원이 많아지면서 기능 개발을 하는 만큼 유지보수의 시간도 늘어나게 되었습니다. 결국 생산성 저하를 감지한 개발팀에서는 테스트 환경을 제대로 구축하고 커버리지를 높이기 위한 계획을 세우기로 했습니다.

## 클래스101 서버 환경

가장 먼저 사용 언어를 TypeScript로 통일했습니다. 주요 모듈(GraphQL, Mongoose)들에서 타입을 손쉽게 체크할 수 있도록 TypeGraphQL, TypeGoose를 사용하고 있습니다. TypeGraphQL은 Query, Mutation을 Class 형태로 작성하도록 있게 해주며 DI(의존성 주입)도 가능하게 합니다.

클래스101 GraphQL 서버에서는 비즈니스 로직을 **Resolver Layer**에서 담당합니다. 하위 레이어인 **Service Layer**는 Resolver에 필요한 실제 로직을 담으면서 클래스로 명확하게 분리되어 있습니다. 더불어 TypeDI라는 Typescript용 DI 모듈을 이용해서 OOP 아키텍처에서 쉽게 의존성을 주입받을 수 있습니다.

## 클래스101 테스트 환경

Javascript에서 테스트를 짤 때 가장 유명한 테스트 프레임워크로는 Jest와 Mocha가 있습니다. 이 중에 개발팀에서 고른 프레임워크는 Jest입니다. Jest는 Snapshot, Mocking, Assertion Library등이 전부 내장되어 있으며 Test를 병렬적으로 돌릴 수 있다는 장점이 있습니다. Typescript 환경이므로 Jest를 돌리기 위한 두 가지 대표적인 방법이 있습니다.

1. Typescript를 Javascript로 트랜스파일링한 후 돌리기
2. Ts-node로 별도의 트랜스파일링 작업 없이 실행한 후 ts-jest를 사용하기

테스트 환경을 빠르게 구축하기 위해 두 번째 방법을 택했습니다.

**mongodb-memory-server**는 MongoDB를 메모리에서 빠르게 실행할 수 있게 해주는 모듈입니다. 또한 Test Suite마다 독립적인 데이터베이스 환경을 제공해서 Test Suite끼리의 의존성을 없앨 수 있습니다. **faker**라는 fake data를 생성해주는 모듈도 사용했습니다. 이에 Mock Data를 손쉽게 생성할 수 있습니다.

## Jest 환경 설정하기

1. Module 설치하기
    ```bash
    yarn init -y
    yarn add -g typescript
    yarn add jest ts-jest @types/jest mongodb-memory-server faker --dev 
    ```

2. `package.json` 설정하기
    ```json
    {
      "name": "@class101/apollo-server",
      "version": "0.0.1",
      "private": true,
      "dependencies": {
        ...
      },
      "scripts": { //스크립트에서 바로 jest를 실행할 수 있지만 Programmatic한 환경 설정을 위해 실행 파일을 따로 분리했습니다.
    		"test": "ts-node --project ./tsconfig.json -r tsconfig-paths/register tests/index.ts",
    		...
      },
      "devDependencies": {
        "@types/jest": "^24.0.17",
        "faker": "^4.1.0",
        "jest": "^24.8.0",
        "ts-jest": "^24.0.2"
    		...
      },
      "main": "index.js",
      "license": "MIT"
    }
    ```

2. `tsconfig.json` : Typescript 기본 설정 파일입니다.
    ```json
    {
      "compilerOptions": {
        "strict": true,
        "strictPropertyInitialization": false,
        "noUnusedParameters": false,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "module": "commonjs",
    		...
        "paths": { //Module Alias 설정으로 import를 할 때 절대경로처럼 사용합니다.
          ...
          "@tests/*": ["tests/*"]  
        },
        "outDir": "./build"
      },
      "include": ["**/*.ts"]
    }
    ```

3. `jest.config.js` : Jest 기본 설정 파일입니다.
    ```javascript
    const {
      compilerOptions: { paths },
    } = require('./tsconfig');
    const { resolve } = require('path');
    
    const moduleNameMapper = {}; //jest환경에서도 module Alias를 사용하기 위해 tsConfig의 paths를 가공해서 설정해줍니다.
    for (key in paths) { 
      const moduleName = `${key.slice(0, key.length - 1)}(.*)$`;
      moduleNameMapper[moduleName] = resolve(__dirname, `./src/${paths[key][0].slice(0, paths[key][0].length - 1)}$1`);
    }
    
    module.exports = {
      testEnvironment: 'node', //jest를 node 환경에서 돌리기 위해선 testEnvironment 설정이 필요합니다.
      roots: ['<rootDir>/src'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper,
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'], //테스트가 돌아가기 전에 의존성이나 추가 환경을 구성하기위한 setup file입니다.  
    };
    ```

4. `<Root>/tests/index.ts` : Jest 를 Programmatic하게 실행하는 파일입니다. Package.json의 스크립트로 바로 돌리지 않고 이렇게 하는 이유는 Programmatic 설정을 할 수 있기 때문입니다. 
    ```typescript
    import jest from 'jest';
    process.env.NODE_ENV = 'test';
    
    const argv = process.argv.slice(2);
    
    //추가적인 Test 환경 설정을 할 수 있습니다.
    
    jest.run(argv);
    ```

5. `/tests/setup.ts` : 테스트를 하기 전에 데이터베이스 의존성 설정을 해줍니다. 이때 monogodb-memory-server를 실행하고 Mongoose(mongodb ODM Library)와 연결시킵니다. 추가적으로 테스트에서 전역으로 사용할 수 있도록 Default Mock Data 세팅을 해줍니다. 이때 mongodb-memory-server가 Test Suit마다 독립성을 보장해주므로 테스트 환경에서의 데이터의 일관성을 보장해줍니다.
    ```typescript
    import { MongoMemoryServer } from 'mongodb-memory-server';
    import * as mongoose from 'mongoose';
    
    const MOCKING_PATH = '@tests/__mocks__';
    let mongoMemoryServer: MongoMemoryServer;
    
    beforeAll(async done => {
      function clearDB() {
        Object.values(mongoose.connection.collections).map(collection => {
          /* tslint:disable:no-empty */
          collection.remove(() => {});
        });
        return done();
      }
    
      if (mongoose.connection.readyState === 0) {
        mongoMemoryServer = new MongoMemoryServer();
        mongoMemoryServer
          .getConnectionString()
          .then(mongoUri => {
            process.env.MONGO_URI = mongoUri;
            return mongoose.connect(mongoUri, {
              useNewUrlParser: true,
              poolSize: process.env.RUNNING_ENV === 'development' ? 10 : 100,
            });
          })
          .then(async () => {
            await createMocksInMongoDB();
            done();
          });
      } else {
        return clearDB();
      }
    });
    
    afterAll(async done => {
      await mongoose.disconnect();
      await mongoMemoryServer.stop();
      return done();
    });
    //자주쓰이는 기본 Mock Data들을 미리 생성해놓습니다.
    async function createMocksInMongoDB() { 
      await createUserMocks();
    	...
    }
    ```

## Unit , Integration Test 예시

### Unit Test

TypeDI에서 테스트할 Service 클래스를 주입받아 사용했습니다. beforeAll에서 추가 의존성을 넣어주고 afterAll에서 다시 초기화합니다. 아래는 클래스101의 수강권 관련 테스트 로직 예시입니다.

```typescript
import { KlassTicketService } from '@graphqlSchema/klassDomain/klassTicket/klassTicket.service';
import { KlassTicketModel } from '@mongooseModels/KlassTicket/KlassTicket';
import { Container } from 'typedi';
...
/*
  * KlassTicket의 종류 : FreeKlassTicket, PaidKlassTicket, expiredKlassTicket, InValidKlassTicket
  */
describe('Get KlassTickets', () => {
  const klassService = Container.get(KlassTicketService);
  const userId = userDefaultVariables.normalUser.firestoreId;

  let KlassTicketMocks: {
    freeKlassTicket: any;
    paidKlassTicket: any;
    expiredKlassTicket: any;
    inValidKlassTicket: any;
  };
  beforeAll(async () => {
    const freeKlassTicket = {
      userId,
      _id: new ObjectId(),
      ...
    };
    const paidKlassTicket = {
      userId,
      _id: new ObjectId(),
      ...
    };
    ...
    KlassTicketMocks = {
      freeKlassTicket,
      paidKlassTicket,
      ...
    };
    await KlassTicketModel.insertMany(Object.values(KlassTicketMocks));
  });
  afterAll(async () => {
    await KlassTicketModel.deleteMany({});
  });

  describe('Get Paid KlassTickets', () => {
    it('Check Get Only PaidKlassTickets', async () => {
      const klassTickets = await klassService.getKlassTickets(
        { userId }
      );
      expect(klassTickets).toHaveLength(1);
      expect(klassTickets[0]).toHaveProperty('_id', KlassTicketMocks.paidKlassTicket._id);
    });
    ...
  });
  ...
});
```

### Integration Test

통합 테스트는 실제로 GraphQL 콜을 통해 비즈니스 로직이 잘 동작하는지에 중점을 뒀습니다. 먼저 graphQL 콜을 하는 모듈을 따로 생성했습니다.

```typescript
import { authChecker } from '@helpers/authChecker';
import { graphql, GraphQLSchema } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { print as gqlToString } from 'graphql/language';
import Maybe from 'graphql/tsutils/Maybe';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
interface Options {
  source: string;
  variables?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;
export const graphqlCall = async <ReturnType = ExecutionResultDataDefault>({ source, variables, userId }: Options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [...],
      dateScalarMode: 'isoDate',
      container: Container,
      ...
    });
  }
  return graphql<ReturnType>({ //source의 경우 string 혹은 graphql-tag 타입으로 넣을 수 있습니다.
    schema,
    source: typeof source !== 'string' ? gqlToString(source) : source,
    variableValues: variables,
    ...
  });
};
```

우리는 GraphQL서버의 Schema&Type을 클라이언트 환경에서 사용할 수 있도록 Typescript 형태로 Generating하고 있습니다(CodeGen). 이에 서버의 변경 사항을 클라이언트에서 정적으로 알아차리고 처리할 수 있습니다. Monorepo를 사용하고 있기에 graphqls 라는 Repo에서 이를 관리합니다. 아래는 클래스101 카테고리를 불러오는 간단한 통합 테스트 예시입니다.

```typescript
import 'reflect-metadata';
import { CATEGORY_SUMMARY_LIST } from '@class101/graphqls/category/queries/CategorySummaryList';
import { Category } from '@graphqlSchema/category/category.type';
import { CategoryModel } from '@mongooseModels/Category/Category';
import { graphqlCall } from '@utils/testUtils/graphqlCall';
...

describe('This is a main call Test Example', () => {
  beforeAll(async () => {
    await CategoryModel.deleteMany({});
    await CategoryModel.insertMany([
      {
        _id: new ObjectId(),
        firestoreId: faker.internet.password,
        title: '미술',
        iconUrl: faker.image.imageUrl,
        klassCount: 1,
        productCount: 1,
        isHide: false,
      },
      ...
    ]);
  });
  it('Check CategorySummaryList available', async () => {
      const result = await graphqlCall<{ categories: Category }>({
        source: CATEGORY_SUMMARY_LIST,
        variables: {
          categoryFilter: {
            isHide: false,
          },
          ...
        },
      });
      expect(result.data && result.data.categories).not.toBe(null);
  });
});
```

## 마무리

클래스101은 테스트 커버리지를 높이기 위해 노력하고 있습니다. "테스트가 없는 코드는 레거시다"라는 말이 있듯이 짜임새 있게 테스트가 구축되어 있다면 유지보수도 훨씬 쉬워질 것입니다. 

## 참고문헌

**웹사이트**  
[https://typegraphql.ml](https://typegraphql.ml/)  
[https://www.npmjs.com/package/mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)  
[https://www.npmjs.com/package/faker](https://www.npmjs.com/package/faker)  
[https://jestjs.io/docs/en/configuration](https://jestjs.io/docs/en/configuration)  