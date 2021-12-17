const { Router } = require("express");


const router = Router()

const raceList = [];


router.get('/', (req, res) => {


    res.send(raceList)


})

router.post('/createRace', (req, res) => {

    const race = {

        id: raceList.length + 1, 
        name: req.body.name,
        location: req.body.location
    }
    raceList.push({ race });
    res.send('Race Created')
});

router.post('/deleteRace/id=:id', (req, res)=> {

    const { id } = req.params
    const select = id - 1
    raceList.splice(select)
    res.send('Race Deleted')

},



router.put('/updateRace/id=:id', (req, res) => {


            const {id} = req.params
            const select = id - 1
            const update = raceList[select].race
            update.name = req.body.name
            update.location = req.body.location

            res.send('Race Updated')
            


})
)




module.exports = router;


