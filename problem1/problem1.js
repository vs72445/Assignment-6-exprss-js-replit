import express from 'express';
import fs from 'fs';


const app = express();

app.listen(5000, () => {
    console.log("Port is listening on 5000.")
})

app.get('/api/student-details', (req, res) => {
    fs.readFile('./info.json', "utf-8", (err, data) => {

        if (err) {
            console.log(err);
        }
        res.end(data);
    });
});

app.post('/api/student-add', (req, res) => {

    const newObject = {
        studentFirstName: req.query.studentFirstName,
        collegeName: req.query.collegeName,
        location: req.query.location
    }
    console.log(newObject);
    const JSON_Data = JSON.stringify(newObject, null, 2);

    fs.appendFileSync('./info.json', "\n" + JSON_Data, (err) => {

        if (err) {
            return err;
        }
    });

    const resultdata = {
        "result": "Added Successfully"
    }

    const JSON_response = JSON.stringify(resultdata);
    res.end(JSON_response);

});
