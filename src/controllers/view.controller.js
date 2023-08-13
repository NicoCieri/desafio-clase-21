import * as productService from "../services/product.services.js";
import * as cartService from "../services/cart.services.js";
import * as userService from "../services/user.services.js";

export const productsView = async (req, res) => {
  try {
    const { user: userId } = req.session?.passport || { user: null };

    const user = await userService.getById(userId);

    const { page } = req.query;
    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await productService.getAllPaginated({ page, limit: 2 });

    const plainProducts = products.map((product) => product.toObject());

    res.render("products", {
      ...(user && { user: user.toObject() }),
      products: plainProducts,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink: `/products?page=${prevPage}`,
      nextLink: `/products?page=${nextPage}`,
    });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
};

export const cartView = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartService.getById(id);
    const plainItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));
    res.render("cart", { items: plainItems, id: cart._id });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
};

export const registerView = (req, res) => {
  res.render("register");
};

export const errorRegisterView = (req, res) => {
  res.render("errorRegister");
};

export const loginView = (req, res) => {
  res.render("login");
};

export const errorLoginView = (req, res) => {
  res.render("errorLogin");
};
