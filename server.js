const express = require('express');
const app = express();
const port = 3000;
const {web3api, configureWeb3} = require("./middleware");

// enable dot env
configureWeb3('e8278f6ef4102da2e877b9424a369f8511faca141d589b71a2d34638c9c6531a')
app.use(web3api);

app.get('/', (req, res) => {
  res.status(200).send(`Hello from ${req.hostname}`);
});

app.use(errorLog);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});