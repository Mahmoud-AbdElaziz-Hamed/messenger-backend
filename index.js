const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!<h1/>
   <h2>This my first task<h2/> 
   <h3>thank you yasser<h3/> `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
