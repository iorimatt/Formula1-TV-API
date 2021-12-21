const { Router, json } = require("express");
const fs = require('fs');
const router = Router()
var cors = require('cors')
const { body, validationResult } = require('express-validator');



const dataStore = __dirname + '/../store/banner-db.json'
const bannerHome = [];



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


    const data = JSON.stringify(bannerHome)
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

router.post('/createBanner',
    body('name', 'invalid format').isString(),
    body('img', 'invalid format').isURL(),
    body('linkTo', 'invalid format').isURL(),
    body('videoDuration', 'invalid format').isString(),

    (req, res) => {

        errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        fs.readFile(dataStore, 'utf-8', (err, data) => {
            if (err) { res.send(err) }


            const bannerHome = JSON.parse(data.toString())
            const banner = {

                name: req.body.name,
                img: req.body.img,
                linkTo: req.body.linkTo,
                videoDuration: req.body.videoDuration
            }

            bannerHome.push(banner);
            data = JSON.stringify(bannerHome)
            fs.writeFile(dataStore, data, (err) => {
                if (err) { console.log(err) }
                res.send('Banner Created')

            })
        })




    });


//delete race 


router.delete('/deleteBanner/id=:id', (req, res) => {
    fs.readFile(dataStore, 'utf-8', (err, data) => {
        if (err) { console.log(err) }
        const bannerHome = JSON.parse(data)
        const { id } = req.params
        bannerHome.splice(id, 1)
        data = JSON.stringify(bannerHome)
        fs.writeFile(dataStore, data, (err) => {
            if (err) {
                console.log(err);
            }
            res.send('Banner Deleted')
        })
    })
},


    //update race 

    router.put('/updateBanner/id=:id', 
    body('name', 'invalid format').isString(),
    body('img', 'invalid format').isURL(),
    body('linkTo', 'invalid format').isURL(),
    body('videoDuration', 'invalid format').isString(),

             
    
    (req, res) => {

        errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }


        fs.readFile(dataStore, 'utf-8', (err, data) => {
            if (err) { throw err }

            const bannerHome = JSON.parse(data)
            const { id } = req.params
            const update = bannerHome[id]

                update.name = req.body.name,
                update.img = req.body.img,
                update.linkTo = req.body.linkTo,
                update.videoDuration = req.body.videoDuration

            data = JSON.stringify(bannerHome)

            fs.writeFile(dataStore, data, (err) => {
                if (err) {
                    throw err;
                }
                res.send('Banner Updated')

            })


        })

    })
)
module.exports = router;
