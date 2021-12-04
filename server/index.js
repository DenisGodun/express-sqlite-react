const express = require("express");
const indexRouter = require("./routes/indexRouter.js");

const app = express();
const PORT =  process.env.PORT || 3001;

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});