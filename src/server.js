import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import { errorHandler } from "./middlewares/errorHandler.js";
import userSession from "./middlewares/userSession.js";
import { __dirname, mongoStoreOptions } from "./utils.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.routes.js";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(userSession);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/users", userRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});
