const Router = require("express").Router;
const db = require("../services/db.js");
const {query, validationResult} = require("express-validator");

const router = new Router();

router.get("/users", 
query("page").optional().isInt({min: 1}).withMessage("Incorrect value of the 'page' field"),
query("limit").optional().isInt({min: 1}).withMessage("Incorrect value of the 'limit' field"), 
(req, res) => {
  const errorsValidator = validationResult(req);
  if (!errorsValidator.isEmpty()) {
    return res.status(400).json({
      "ok": false,
      errors: errorsValidator.array()
    });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  let totalUsers = null;
  db.countAllUsers( (error, rows) => {
    if (error) {
      res.status(500).json({
        "ok": false,
        "error": error.message
      });
      return;
    }
    totalUsers = rows[0].count;  
  });

  db.getUsers(skipIndex, limit, (error, users) => {
    if (error) {
      res.status(500).json({
        "ok": false,
        "error": error.message
      });
      return;
    }
    res.status(200).json({
      "ok": true,
      "result" : {
        "total-count": totalUsers,
        "page": page,
        "limit": limit,
        "users": users  
      }
    });
  });
});

module.exports = router;