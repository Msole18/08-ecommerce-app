export default {
  routes: [
    {
      method: 'GET',
      path: '/items', // Ruta para obtener todos los ítems
      handler: 'api::item.item.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/items/:id', // Ruta para obtener un ítem por su ID
      handler: 'api::item.item.findOne',
      config: {
        auth: false,
      },
    },
  ],
}
