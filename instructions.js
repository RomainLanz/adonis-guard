'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { join } = require('path')

module.exports = async function (cli) {
  await cli.makeConfig('acl.js', join(__dirname, './templates/acl.js'))
    .catch((e) => {})
  cli.command.completed('create', 'start/acl.js')
}
