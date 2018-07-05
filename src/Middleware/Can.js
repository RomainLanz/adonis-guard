'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { AuthorizationException } = require('../Exceptions')

class Can {
  async handle ({ auth, guard }, next, [method, ...argument]) {
    if (!guard.can(auth.user).pass(method).for(argument)) {
      throw new AuthorizationException()
    }

    await next()
  }
}

module.exports = Can
