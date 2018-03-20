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
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Adonis/Addons/Gate', () => Gate)
    this.app.singleton('Adonis/Addons/Guard', () => Guard)

    this.app.alias('Adonis/Addons/Gate', 'Gate')
    this.app.alias('Adonis/Addons/Guard', 'Guard')

    this.app.bind('Adonis/Middleware/GuardInit', () => {
      const GuardInit = require('../src/Middleware/GuardInit') // eslint-disable-line global-require

      return new GuardInit()
    })
  }
}

module.exports = GuardProvider
