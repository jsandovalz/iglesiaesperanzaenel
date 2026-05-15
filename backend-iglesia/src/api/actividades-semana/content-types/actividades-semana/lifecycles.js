module.exports = {
  async afterCreate() {
    await strapi.reload();
  },
  async afterUpdate() {
    await strapi.reload();
  }
};
