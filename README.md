Demo can be seen here:
http://rikka.cf

For local test build run:
ionic serve

For leaflet, make sure package.json has dependancy leaflet,
npm install leaflet --save
npm install leaflet-route-machine --save

Finished:
- Leaflet to display map
- Photon to autocomplete 
- Leaflet-route-machine to calculate map route


TODO
---------------------------------------------
Fixes:
- Catch Uncaught (in promise) error, alert user location cannot be found
- When impossible route, routing machine will error. Notify User
- Fix workaround in ngOnInit declaring let var = this.var because of
  function scope (in search() too)
- Back button doesn't invoke menu
- Add search route button
- Automaticall close when start/end filled out? 
Improvements:
- Figure out what to do with directions (Leaflet.Routing.Itinerary)
- Drop down menu for autocomplete (can select from and replaces query)
- Find all restaurants within x radius of path
- Use Yelp API to get reviews and sort all
- Probably make another tab to list all of them
