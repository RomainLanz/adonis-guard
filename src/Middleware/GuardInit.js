'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { Guard } = require('@slynova/fence')

class GuardInit {
  async handle ({ auth }, next) {
    let user = null

    try {
      user = await auth.getUser()
    } catch (e) {
      //
    }

    if (user !== null) {
      Guard.setDefaultUser(user)
    }

    await next()
  }
}

module.exports = GuardInit
