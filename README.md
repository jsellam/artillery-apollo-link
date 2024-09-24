# artillery-apollo-link

This link for Apollo Client allows logging GraphQL requests in YAML format for Artillery.
Before getting started, consult the documentation for Artillery and Apollo Client.

[Read the artillery doc](https://www.artillery.io/docs)

[Read the Apollo client link doc](https://www.apollographql.com/docs/react/api/link/introduction/)

## How to install

`npm install artillery-apollo-link`

## How to use

```
import {reateArtilleryApolloLink} from 'artillery-apollo-link';

const artilleryLink = createArtilleryApolloLink({
  name: 'My first scenario',
  url: '/',
  headers: {
    Authorization: 'Bearer XXXXXXX',
  },
});
```

Add the link in the apollo client constructor just before the httpLink

## Config

| Property    | Required | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| name        | true     | The scenario name                                 |
| url         | true     | The GQL endpoint                                  |
| headers     | false    | key / value object of headers                     |
| thinkMapper | false    | (timeMs:number) => string. used to map time value |
| disabled    | false    | default false, disable logs                       |

`thinkMapper`can be used with a processor like this :

```
thinkMapper:(timeMs:Number) => `addRandomTime( {{ timeMs }})`;
```
