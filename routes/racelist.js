const { Router, json } = require("express");
const fs = require('fs');
const router = Router()
var cors = require('cors')


const dataStore = __dirname + '/../store/racelist-db.json'
const raceList = [];



router.get('/', cors(), (req, res) => {

    fs.readFile(dataStore, 'utf-8', (err, data) => {

        if (err) {

            console.log(err)

        }

        const raceList = JSON.parse(data)
        return res.send(raceList)


    })


})



router.post('/newList', (req, res) => {


    const data = JSON.stringify(raceList)
    fs.writeFile(dataStore, data, { flag: "wx" }, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                res.send('Only one list is allowed')
            }

        }
        res.send('list created')
    })
})


//create race

router.post('/createRace', (req, res) => {

    fs.readFile(dataStore, 'utf-8', (err, data) => {
        if (err) { console.log(err) }
        const raceList = JSON.parse(data.toString())
        const race = {
            name: req.body.name,
            date: req.body.date,
            time: req.body.time
        }

        raceList.push(race);
        data = JSON.stringify(raceList)
        fs.writeFile(dataStore, data, (err) => {
            if (err) { console.log(err) }
            res.send('Race Created')

        })
    })




});


//delete race 


router.delete('/deleteRace/id=:id', (req, res) => {
    fs.readFile(dataStore, 'utf-8', (err, data) => {
        if (err) { console.log(err) }
        const raceList = JSON.parse(data)
        const { id } = req.params
        raceList.splice(id, 1)
        data = JSON.stringify(raceList)
        fs.writeFile(dataStore, data, (err) => {
            if (err) {
                console.log(err);
            }
            res.send('Race Deleted')
        })
    })
},


    //update race 

    router.put('/updateRace/id=:id', (req, res) => {

        fs.readFile(dataStore, 'utf-8', (err, data) => {
            if (err) { throw err }

            const raceList = JSON.parse(data)
            const { id } = req.params
            const update = raceList[id]
            update.name = req.body.name
            update.time = req.body.time
            update.date = req.body.date
            data = JSON.stringify(raceList)

            fs.writeFile(dataStore, data, (err) => {
                if (err) {
                    throw err;
                }
                res.send('Race Updated')

            })


        })
        res.send('Race Updated')
    })
)
module.exports = router;
