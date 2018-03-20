'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { Gate, Guard } = require('@slynova/fence')
const { ServiceProvider } = require('@adonisjs/fold')

class GuardProvider extends ServiceProvider {
  /**
   * Register all the required providers.
   *
   * @return {void}
   */
  register () {
    const Context = this.app.use('Adonis/Src/HttpContext')

    Context.getter('guard', () => Guard)
  }

  /**
   * On boot add commands with ace.
   *
   * @return {void}
   */
  boot () {
    this.app.singleton('Adonis/Addons/Gate', () => Gate)
    this.app.singleton('Adonis/Addons/Guard', () => Guard)
  }
}

module.exports = GuardProvider
