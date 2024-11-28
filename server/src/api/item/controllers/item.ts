/**
 * item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::item.item',
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params

      // Asegurarnos de que el ID sea un número
      const itemId = parseInt(id, 10)
      if (isNaN(itemId)) {
        return ctx.badRequest('Invalid ID format')
      }

      // Buscar el ítem por ID
      const item = await strapi.db.query('api::item.item').findOne({
        where: { id: itemId },
        populate: ['image'], // Cambia esto si no deseas incluir relaciones automáticamente
      })

      if (!item) {
        return ctx.notFound('Item not found')
      }

      // Sanitizamos la salida y transformamos la respuesta
      const sanitizedEntity = await this.sanitizeOutput(item, ctx)
      return this.transformResponse(sanitizedEntity)
    },
  })
)
