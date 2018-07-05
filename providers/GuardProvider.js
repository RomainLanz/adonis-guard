'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { Gate } = require('@slynova/fence')
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
    this.app.alias('Adonis/Addons/Gate', 'Gate')

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
    ace.addCommand('Guard/Commands/Make:Policy')

    try {
      const View = this.app.use('Adonis/Src/View')
      const Can = require('../src/ViewBindings/Can')
      const Cannot = require('../src/ViewBindings/Cannot')
      View.tag(new Can())
      View.tag(new Cannot())
    } catch (error) {
      // Ignore error when end-user is not using views
    }
  }
}

module.exports = GuardProvider
