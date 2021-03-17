const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/answer', api.model);
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});