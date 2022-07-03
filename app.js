const express = require("express");
const app = express();
const port = 4000;

app.get("/about", (req, res) => {
  const response = {
    title: "About",
    time_createdAT: new Date(),
    isValid: false,
  };
  console.log("res", response);
  res.json(response);
});

app.get("/blog", (req, res) => {
  const response = {
    title: "Blog",
    time_createdAT: new Date(),
    isValid: false,
  };
  console.log("res", response);
  res.json(response);
});

app.get("/signIn", (req, res) => {
  const response = {
    title: "Sign In",
    time_createdAT: new Date(),
    isValid: false,
    rawRequest: req,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
