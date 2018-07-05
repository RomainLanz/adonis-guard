'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { RuntimeException } = require('@adonisjs/generic-exceptions')

class AuthorizationException extends RuntimeException {}

module.exports = { AuthorizationException }
