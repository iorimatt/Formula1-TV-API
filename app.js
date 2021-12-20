const express = require('express');
const res = require('express/lib/response');
const app = express()
const racelist = require('./routes/racelist')
var cors = require('cors')
app.use(express.json())
app.use('/racelist', racelist)
app.use(cors())
app.listen(3000, () => {
    console.log('Server running on 3000')
});


