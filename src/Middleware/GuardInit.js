'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Guard = use('Guard')

class GuardInit {
  /**
   *
   *
   * @method handle
   *
   * @param  {Function} next
   *
   * @return {void}
   */
  async handle ({ auth }, next) {
    try {
      const user = await auth.getUser()

      Guard.setDefaultUser(user)
    } catch (e) {
      //
    }

    await next()
  }
}

module.exports = GuardInit
