const Router = require('express').Router;
const db = require("../services/db.js");

const router = new Router();

router.get("/user", (req, res) => {
  const userId = parseInt(req.query.id);
  const from = req.query.from || null;
  const to = req.query.to || null;
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
        "data": rows  
      }
    })
  });
});

module.exports = router;