const router = require("express").Router();

const {
  getTransactions,
  postTransactions,
  deleteTransactions
} = require("../controllers/transactions-controller");

router
  .route("/")
  .get(getTransactions)
  .post(postTransactions);
router.route("/:id").delete(deleteTransactions);

module.exports = router;
