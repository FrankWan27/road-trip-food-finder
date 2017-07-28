to run:

ionic serve

For leaflet, make sure package.json has dependancy leaflet,
npm install leaflet --save
npm install leaflet-route-machine --save

Uncaught (in promise) object: Position Error
posible china error? 

Finished:
- Leaflet to display map
- Photon to autocomplete 
- Leaflet-route-machine to calculate map


TODO
---------------------------------------------
Fixes:
- Catch Uncaught (in promise) error, alert user location cannot be found
- Navigate to Map page when pressing Search, tab bar should change
- Search loads map page before coordinates load. Currently promise.then() 
doesn't do anything.

Improvements:
- Figure out what to do with directions (Leaflet.Routing.Itinerary)
- Drop down menu for autocomplete (can select from and replaces query)
- Find all restaurants within x radius of path
- Use Yelp API to get reviews and sort all
- Probably make another tab to list all of them
