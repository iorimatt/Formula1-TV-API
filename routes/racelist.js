const { Router } = require("express");


const router = Router()

const raceList = [
    
    {name:'bahrein'},
    {name:'interlakes'},
    {name: 'spa francochamp'}
    
  
];


router.get('/', (req, res)=>{


res.send(raceList)


})


module.exports = router;


