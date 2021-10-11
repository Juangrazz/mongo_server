const sportsCtrl = {};

const bbdd = require("../database");

sportsCtrl.getSports = async (req, res) => {

    // CONNECT
    bbdd.getConnection(function (err, connection) {
        if (err) throw err;

        console.log("Connection successful");
        // MADE THE QUERY
        connection.query('SELECT * from sports', function (error, results) {
            
            // RELEASE THE CONNECTION
            connection.release();
            console.log("Connection released");

            // SORT RESULTS
            results.sort((sportA, sportB) => sportA.sport_name.localeCompare(sportB.sport_name));

            // SEND THE SORT RESULT
            res.status(200).send(results);

            if (error) throw error;
        });
    });
};

module.exports = sportsCtrl;