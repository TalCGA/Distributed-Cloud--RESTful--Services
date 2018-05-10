
var     vote  = require('./vote');
const   express = require('express'),
        app     = express(),
        port    = process.env.PORT||3000;


// vote(<maxVoteNumber>, <voteCategory>, {listofVotes})
var primeMiniVote = vote(
    7, 
    "Prime Minister",
    { Netanyau:0, Herzog:0, Lapid:0, Benet:0}
);


// vote(<maxVoteNumber>, <voteCategory>, {listofVotes})
var likudPrimariesVote = vote(
    10, 
    "Likud Primaries",
    { Netanyau:0, Erdan:0, Kats:0, Regev:0 }
);




console.log(primeMiniVote.getAllVotesRecord());

/*app.get('/',function (req,res) {
    res.send(primeMiniVote.getAllVotesRecord());
});
*/
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
              <html>
                <body>
                    ${primeMiniVote.getAllVotesRecord()}               
                </body>
              </html>`
        )
    }
);
app.listen(port);
console.log(`Listening in port ${port}`);