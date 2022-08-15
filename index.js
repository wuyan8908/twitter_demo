const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())
const { makeTweet } = require("./functions/tweet");
app.post('/tweet', makeTweet);

app.listen(3000, () =>
  console.log('app listening on port 3000!'),
);