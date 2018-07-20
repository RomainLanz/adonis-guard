'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { Gate, Helpers } = require('@slynova/fence')
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

    this.app.bind('Adonis/Middleware/Can', () => {
      const Can = require('../src/Middleware/Can') // eslint-disable-line global-require
      return new Can()
    })

    this.app.bind('Adonis/Middleware/GuardInit', () => {
      const GuardInit = require('../src/Middleware/GuardInit') // eslint-disable-line global-require
      return new GuardInit()
    })
  }

  $monkeyPatch () {
    Helpers.formatResourceName = (resource) => {
      return resource.$gate.namespace
    }

    Gate.policy = (resourceName, policyName) => {
      const resource = this.app.use(resourceName)
      resource.prototype.$gate = { namespace: resourceName }

      const policy = this.app.make(policyName)

      Gate.$getStorage().storePolicy(resourceName, policy)
    }
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
    this.$monkeyPatch()
  }

  boot () {
    const ace = require('@adonisjs/ace') // eslint-disable-line global-require
    ace.addCommand('Guard/Commands/Make:Policy')

    this.app.with('Adonis/Src/View', (View) => {
      const Can = require('../src/ViewBindings/Can')
      const Cannot = require('../src/ViewBindings/Cannot')

      View.tag(new Can())
      View.tag(new Cannot())
    })
  }
}

module.exports = GuardProvider
