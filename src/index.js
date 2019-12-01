const express = require("express");
const search = require("./routes/index");

app = express();
app.use(express.json());

app.get('/', search);

app.listen(3333, () => {
  console.log('Server running at 3333');
});
