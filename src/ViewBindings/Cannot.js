'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { BaseTag } = require('edge.js')

class Cannot extends BaseTag {
  /**
   * The tag name.
   *
   * @return {String}
   */
  get tagName () {
    return 'cannot'
  }

  /**
   * Tag is a block tag.
   *
   * @return {Boolean}
   */
  get isBlock () {
    return true
  }

  /**
   * Compile the template.
   *
   * @param  {Object} compiler
   * @param  {Object} lexer
   * @param  {Object} buffer
   * @param  {String} options.body
   * @param  {Number} options.lineno
   *
   * @return {void}
   */
  compile (compiler, lexer, buffer, { body, childs, lineno }) {
    const [ability, resource, user] = this._compileStatement(lexer, body, lineno).toStatement()

    buffer.writeLine(`if (this.context.resolve('guard').denies(${ability}, ${resource}, ${user})) {`)
    buffer.indent()

    childs.forEach(child => compiler.parseLine(child))

    buffer.dedent()
    buffer.writeLine('}')
  }

  run () {
  }
}

module.exports = Can
