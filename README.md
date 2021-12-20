# Formula1-TV-API


<h3>SERVER RUN IN LOCALHOST 3000 </h3>

<p> SIMPLE API for a Formula 1 TV Project </p> 

</p> command: node app.js </p>
 
<h3> API ENDPOINTS </h3>



<h4> GET/racelist </h4> 

response: an array of race-list.json 



<h4> POST/racelist/createRace </h4> 

body request: {name:string, location:string}

response: 'Race created' 

<h4> POST/racelist/deleteRace/id={array.indexOf} </h4> 

response: 'Race deleted' 

<h4> POST/racelist/updateRace/id={array.indexOf} </h4> 

response: 'Race updated' 

<h3> Call this endpoint to avoid errors, if you delete a race-list.json  </h3> 

<h4> POST/racelist/newList </h4> 

response: 'List created' 






