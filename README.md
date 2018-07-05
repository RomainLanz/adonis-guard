# Adonis Guard 🔰

This package is an **authorization provider** built on top of [@slynova/fence](https://github.com/Slynova-Org/fence).

## Getting Started

Install the package using the `adonis` CLI.

```bash
> adonis install adonis-guard
```

Follow instruction that are displayed ([or read them here](https://github.com/RomainLanz/adonis-guard/blob/master/instructions.md)).

## Defining your authorization

### Gate
Gates must be defined inside the `start/acl.js` file. This file will be loaded only once when the server is launch.
To define a gate, use the `Gate` facade.

```js
// start/acl.js
const Gate = use('Gate')

Gate.define('gateName', (user, resource) => {
  // Payload
  // e.g. return user.id === resource.author_id
})
```

### Policy
You can generate a new policy by using the command `adonis make:policy {name}`.
This will generate a file in `app/Policies/{Name}Policy.js`.
To attach a policy to a resource, you need to call the `policy` method of the `Gate` facade.

```js
// start/acl.js
const Gate = use('Gate')
const MyPolicy = use('App/Policies/MyPolicy')

Gate.policy(myResource, MyPolicy)
```

> `myResource` could be a JSON object (with `_className` key), an instance, a class, or a simple string.

## Usage

Adonis Guard automaticaly share an instance of the `guard` in the context of each request.
To validate the authorization of a user you simply need to extract it from the context and run the gate/policy.

```js
// Controller
async show ({ guard, params }) {
  const post = await Post.find(params.id)

  if (guard.denies('show', post)) {
    // abort 401
  }

  // ...
}
```

```js
// RouteValidator
async authorize () {
  const post = await Post.find(this.ctx.params.id)

  if (this.ctx.guard.denies('show', post)) {
    // abort 401
  }

  // ...
}
```

You can also use it in your view to choose to display or not an element.

```html
@if(guard.allows('edit', post))
  <a href="/posts/{{ post.id }}/edit">Edit</a>
@endif
```

**Public API**

```js
guard.allows('gateName/Policy Method', resource)
guard.denies('gateName/Policy Method', resource)
guard.allows('gateName/Policy Method', resource, user)
guard.denies('gateName/Policy Method', resource, user)
guard.can(user).pass('gateName').for(resource)
guard.can(user).callPolicy('Policy Method', resource)
```
