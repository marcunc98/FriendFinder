// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    var match = {
      name: "",
      photo: "",
      scoreDiff: 1000
    };

    console.log(req.body);

    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);

    var totalDiff = 0;

    for (var i = 0; i < friendsData.length; i++) {
      console.log(friendsData[i]);
      totalDiff = 0;

      for (var j = 0; j < friendsData[i].scores[j]; j++) {
        totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j])
        );
        if ((totalDiff += match.scoreDiff)) {
          match.name = friendsData[i].name;
          match.photo = friendsData[i].photo;
          match.scoreDiff = totalDiff;
        }
      }
    }
    friendsData.push(userData);

    res.json(match);
  });
};
