const citiesCtrl = {};

const bbdd = require("../database");

citiesCtrl.getCities = async (req, res) => {

    // CONNECT
    bbdd.getConnection(function (err, connection) {
        if (err) throw err;

        console.log("Connection successful");
        // MADE THE QUERY
        connection.query('SELECT * from cities', function (error, results, fields) {
            
            // RELEASE THE CONNECTION
            connection.release();
            console.log("Connection released");

            // SORT RESULTS
            results.sort((cityA, cityB) => cityA.city_name.localeCompare(cityB.city_name));

            // SEND THE SORT RESULT
            res.status(200).send(results);

            if (error) throw error;
        });
    });
};


module.exports = citiesCtrl;