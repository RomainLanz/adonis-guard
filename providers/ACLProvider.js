'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { Gate, Guard } = require('@slynova/fence')
const { ServiceProvider } = require('@adonisjs/fold')

class ACLProvider extends ServiceProvider {
  /**
   * Registers providers for all the ACL related
   * commands.
   *
   * @return {void}
   */
  $registerCommands () {
    this.app.bind('ACL/Commands/Make:Policy', () => require('../commands/MakePolicy'))
  }

  /**
   * Registers providers for all the GraphQL related
   * classes.
   *
   * @return {void}
   */
  $registerAlias () {
    this.app.singleton('Adonis/Addons/Gate', () => Gate)
    this.app.singleton('Adonis/Addons/Guard', () => Guard)

    this.app.alias('Adonis/Addons/Gate', 'Gate')
    this.app.alias('Adonis/Addons/Guard', 'Guard')

    this.app.bind('Adonis/Middleware/ACLInit', () => {
      const ACLInit = require('../src/Middleware/ACLInit') // eslint-disable-line global-require

      return new ACLInit()
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
    const ace = require('@adonisjs/ace')
    ace.addCommand('ACL/Commands/Make:Policy')
  }
}

module.exports = ACLProvider
