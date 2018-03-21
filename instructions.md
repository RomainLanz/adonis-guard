## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-guard/providers/GuardProvider'
]
```

## Registering middleware

Add the `Adonis/Middleware/GuardInit` middleware in the `start/kernel.js` file **after** `AuthInit`.

```js
// start/kernel.js
const globalMiddleware = [
  ...
  'Adonis/Middleware/AuthInit',
  'Adonis/Middleware/GuardInit',
  ...
]
```

## Loading acl.js

Add the `start/acl.js` file to your Ignitor starting script.

```js
// server.js

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .preLoad('start/acl')
  .fireHttpServer()
  .catch(console.error)
```
