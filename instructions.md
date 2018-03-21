## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-acl/providers/ACLProvider'
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
