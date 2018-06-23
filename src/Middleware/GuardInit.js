'use strict'

/**
 * adonis-guard
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Guard = use('Guard')

class GuardInit {
  /**
   *
   *
   * @method handle
   *
   * @param  {Function} next
   *
   * @return {void}
   */
  async handle (ctx, next) {
    try {
      const user = await ctx.auth.getUser().catch(() => {}) // eslint-disable-line

      const guard = Guard.setDefaultUser(user)

      /**
       * Adding guard in the context
       */
      ctx.guard = guard

      /**
       * Sharing guard with the view
       */
      if (ctx.view && typeof (ctx.view.share) === 'function') {
        ctx.view.share({ guard })
      }
    } catch (e) {
      //
    }

    await next()
  }
}

module.exports = GuardInit
