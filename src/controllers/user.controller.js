import * as userService from "../services/user.services.js";

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
