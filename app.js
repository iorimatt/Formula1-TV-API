const express = require('express');
const res = require('express/lib/response');
const app = express()
const racelist = require('./routes/racelist')
app.use(express.json())
app.use('/racelist', racelist)
app.listen(3000, () => {
    console.log('Server running on 3000')
});
app.get('/', (req, res) => {
    res.send(200)
}
);
app.get('/races/:name', (req, res) => {
   
    const {name} = req.params
    const race = raceList.find((race) => race.name == name)
    res.send(race)
    
})