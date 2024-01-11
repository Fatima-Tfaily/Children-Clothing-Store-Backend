require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const categoriesRoutes = require("./routes/CategoriesRoute");
const cartsRoutes = require("./routes/CartsRoute");
const ordersRoutes = require("./routes/OrdersRoute");
const favoritesRoutes = require("./routes/FavoritesRoute");
const productsRoutes = require("./routes/ProductsRoute");
const usersRoutes = require("./routes/UsersRoute");

const app = express();
const port = process.env.Port;

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use("/categories", categoriesRoutes);
app.use("/carts", cartsRoutes);
app.use("/orders", ordersRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  dbConnection()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  console.log(`Example app listening on port ${port}`);
});
