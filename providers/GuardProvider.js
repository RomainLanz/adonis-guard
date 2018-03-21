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
   * Registers providers for all the Guard related
   * commands.
   *
   * @return {void}
   */
  $registerCommands () {
    this.app.bind('Guard/Commands/Make:Policy', () => require('../commands/MakePolicy')) // eslint-disable-line global-require
  }

  /**
   * Registers providers for all the Guard related
   * classes.
   *
   * @return {void}
   */
  $registerAlias () {
    this.app.singleton('Adonis/Addons/Gate', () => Gate)
    this.app.singleton('Adonis/Addons/Guard', () => Guard)

    this.app.alias('Adonis/Addons/Gate', 'Gate')
    this.app.alias('Adonis/Addons/Guard', 'Guard')

    this.app.bind('Adonis/Middleware/GuardInit', () => {
      const GuardInit = require('../src/Middleware/GuardInit') // eslint-disable-line global-require

      return new GuardInit()
    })
  }

  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.$registerCommands()
    this.$registerAlias()
  }

  boot () {
    const ace = require('@adonisjs/ace') // eslint-disable-line global-require
    const View = this.app.use('Adonis/Src/View')

    ace.addCommand('Guard/Commands/Make:Policy')

    View.global('Guard', Guard)
  }
}

module.exports = GuardProvider
