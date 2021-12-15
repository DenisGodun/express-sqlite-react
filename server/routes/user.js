const Router = require("express").Router;
const db = require("../services/db.js");
const {query, validationResult} = require("express-validator");

const router = new Router();

router.get("/user", 
query("id").not().isEmpty().withMessage('id is required')
.isInt({min: 1}).withMessage("Incorrect value of the 'page' field"),
query("from").optional().isDate().withMessage("Incorrect value of the 'from' field"),
query("to").optional().isDate().withMessage("Incorrect value of the 'to' field"),
  (req, res) => {
  const errorsValidator = validationResult(req);
  if (!errorsValidator.isEmpty()) {
    return res.status(400).json({
      "ok": false,
      errors: errorsValidator.array()
    });
  }

  const userId = parseInt(req.query.id);
  const from = req.query.from || null;
  const to = req.query.to || null;
  let userFirstName = null;
  let userLastName = null;

  db.getUserInfoById(userId, (error, rows) => {
    if (error) {
      res.status(500).json({
        "ok": false,
        "error": error.message
      });
      return;
    }
    userFirstName = rows[0].first_name;
    userLastName = rows[0].last_name;
  });

  db.getUserStatisticById(userId, from, to, (error, rows) => {
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
        "first_name": userFirstName,
        "last_name": userLastName,
        "data": rows  
      }
    })
  });
});

module.exports = router;