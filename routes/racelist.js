const { Router } = require("express");
const fs = require('fs');
const { send } = require("process");
const router = Router()
const raceList = [];
router.get('/', (req, res) => {
    res.send(raceList)
})
router.post('/newList', (req, res) => {
 
  
    const data = JSON.stringify(raceList)
    fs.writeFile('race-list.json', data, { flag: "wx" }, (err)=>{
        if (err) {
            if(err.code === 'EEXIST'){
                res.send('Only one list is allowed') 
            }
           
        }
        res.send('list created')
    })
})
router.post('/createRace', (req, res) => {
    fs.readFile('race-list.json', 'utf-8', (err, data)=>{
        if(err){console.log(err) }
        const raceList = JSON.parse(data.toString())
        const race = {
            name: req.body.name,
            location: req.body.location
        }
        
        raceList.push({ race });
        data = JSON.stringify(raceList)
        fs.writeFile('race-list.json', data, (err) => {
            if (err) { console.log(err)  }
            res.send('Race Created')
    
        })
    })
    
    
   
   
});
router.post('/deleteRace/id=:id', (req, res) => {
    fs.readFile('race-list.json', 'utf-8', (err, data) => {
        if (err) { console.log(err)  }
        const raceList = JSON.parse(data)
        const { id } = req.params
        raceList.splice(id, 1)
        data = JSON.stringify(raceList)
        fs.writeFile('race-list.json', data, (err) => {
            if (err) {
                console.log(err);
            }
            res.send('Race Deleted')
        })
    })
},
    router.put('/updateRace/id=:id', (req, res) => {
            
          fs.readFile('race-list.json', 'utf-8', (err, data) => {
            if (err) { throw err }
    
            const raceList = JSON.parse(data)
            const { id } = req.params
            const update = raceList[id].race
            update.name = req.body.name
            update.location = req.body.location
            data = JSON.stringify(raceList)
    
            fs.writeFile('race-list.json', data, (err) => {
                if (err) {
                    throw err;
                }
                res.send('Race Deleted')
    
            })
    
    
        })
    res.send('Race Updated')
    })
)
module.exports = router;
