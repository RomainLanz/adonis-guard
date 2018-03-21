'use strict'

/**
 * adonis-acl
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const test = require('japa')
const edge = require('edge.js')

class View {
  constructor () {
    this.engine = edge
    this.tag = this.engine.tag.bind(this.engine)
  }
}


