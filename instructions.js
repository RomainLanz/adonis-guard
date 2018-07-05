'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { join } = require('path')

module.exports = async function (cli) {
  await cli.copy(join(__dirname, 'templates/acl.js'), join(this.helpers.appRoot(), 'start/acl.js'))
    .catch((e) => {})
  cli.command.completed('create', 'start/acl.js')
}
