import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPaginated({
    limit = 10,
    page = 1,
    sortOrder = "asc",
    category = null,
    available = null,
  } = {}) {
    try {
      const query = {
        ...(category !== null && { category: { $eq: category } }),
        ...(available !== null && {
          stock: { ...(available ? { $gt: 0 } : { $eq: 0 }) },
        }),
      };

      console.log(query);

      const response = await ProductModel.paginate(query, {
        page,
        limit,
        sort: { price: sortOrder },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(product) {
    try {
      const response = await ProductModel.create(product);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, product) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, product, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
