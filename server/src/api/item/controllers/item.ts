/**
 * item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::item.item',
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params

      // Ensure that the ID is a number
      const itemId = parseInt(id, 10)
      if (isNaN(itemId)) {
        return ctx.badRequest('Invalid ID format')
      }

      // Search item by ID
      const item = await strapi.db.query('api::item.item').findOne({
        where: { id: itemId },
        populate: ['image'], // Change this if you do not want to include relationships automatically
      })

      if (!item) {
        return ctx.notFound('Item not found')
      }

      // Sanitizing the output and transforming the response
      const sanitizedEntity = await this.sanitizeOutput(item, ctx)
      return this.transformResponse(sanitizedEntity)
    },
  })
)
