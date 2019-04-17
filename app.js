const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const { fName, lName, email } = req.body;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3df20a1a73",
    method: "POST",
    headers: {
      Authorization: "safar dfd0b22f407b24f7ddd9c19817c1f4e5-us20"
    },
    body: jsonData
  };
  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.satatusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

//dfd0b22f407b24f7ddd9c19817c1f4e5-us20 3df20a1a73
