const app = require('./app.js');
const port = process.env.PORT || 3000;

console.log("server.js");

app.get("/", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(port, function() {
    console.log('Express listening on port', port);
})