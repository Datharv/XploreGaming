const express = require("express");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/me").get(isAuthenticatedUser, myOrders);

router
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
