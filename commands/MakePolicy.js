'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const _ = require('lodash')
const { singular } = require('pluralize')
const { Command } = require('@adonisjs/ace')
const { basename, join, sep } = require('path')

class MakePolicy extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return 'make:policy { name: Name of the policy }'
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new Policy'
  }

  /**
   * Returns file name for policy.
   *
   *
   * @param  {String}    name
   *
   * @return {String}
   */
  $getFileName (name) {
    name = name.replace(/policy/ig, '')

    return `${singular(_.upperFirst(_.camelCase(name)))}Policy`
  }

  /**
   * Returns path to the policy file
   *
   * @param  {String}    name
   *
   * @return {String}
   */
  $getFilePath (name) {
    const baseName = basename(name)
    const normalizedName = name.replace(baseName, this.$getFileName(baseName))

    return `${join(process.cwd(), 'app/Policies', normalizedName)}.js`
  }

  /**
   * Returns name of resource from policy name.
   *
   * @param  {String}    name
   *
   * @return {String}
   */
  $getResourceName (name) {
    return this.$getFileName(name).replace('Policy', '').toLowerCase()
  }

  /**
   * Method called when command is executed. This method will
   * require all files from the migrations directory
   * and execute all pending schema files.
   *
   * @param  {object}   args
   *
   * @return {void}
   */
  async handle ({ name }) {
    const templatePath = join(__dirname, '../templates/Policy.mustache')
    const filePath = this.$getFilePath(name)
    const templateContent = await this.readFile(templatePath, 'utf-8')

    await this.generateFile(filePath, templateContent, {
      name: this.$getFileName(name),
      resource: this.$getResourceName(name),
    })

    const createdFile = filePath.replace(process.cwd(), '').replace(sep, '')

    // eslint-disable-next-line no-console
    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)
  }
}

module.exports = MakePolicy
