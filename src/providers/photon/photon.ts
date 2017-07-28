import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PhotonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PhotonProvider {
  public sLat: any;
  public sLng: any;
  public eLat: any;
  public eLng: any;

  constructor(public http: Http) {

  }

  searchRoute(start: any, end: any) {
    //1.
    console.log("starting task");

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://photon.komoot.de/api/?q=' + start + '&limit=1')
        .map(res => res.json())
        .subscribe(data => {
            console.log(data.features[0].geometry.coordinates[0]);
            console.log(data.features[0].geometry.coordinates[1]);


            //can make this an array
            this.sLat = data.features[0].geometry.coordinates[0];
            this.sLng = data.features[0].geometry.coordinates[1];
         console.log("finding path between " + start + this.sLat + " and " + end + this.eLat);

        });

        this.http.get('https://photon.komoot.de/api/?q=' + end + '&limit=1')
        .map(res => res.json())
        .subscribe(data => {

            console.log(data.features[0].geometry.coordinates[0]);
            console.log(data.features[0].geometry.coordinates[1]);
            //can make this an array
            this.eLat = data.features[0].geometry.coordinates[0];
            this.eLng = data.features[0].geometry.coordinates[1];
            //3. 
            resolve();

        });
        //2.
        console.log("ended task");


    });


  }

  autocomplete(query: any) {
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://photon.komoot.de/api/?q=' + query + '&limit=10')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);

          for(let i = 0; i < data.features.length; i++)
          {
            let name = '', street = '', city = '', state = '', country = '';

            if(data.features[i].properties.name != undefined)
              name = 'Name: ' + data.features[i].properties.name;
            
            if(data.features[i].properties.street != undefined) 
              street = ', Street: ' + data.features[i].properties.street;
            
            if(data.features[i].properties.city != undefined)
              city = ', City: ' + data.features[i].properties.city;
            
            if(data.features[i].properties.state != undefined)
              state = ', State: ' + data.features[i].properties.state;
            
            if(data.features[i].properties.country != undefined)
              country = ', Country: ' + data.features[i].properties.country;

            // if(name == city) state = '';
            // if(state == country) country = '';

            console.log(name + street + city + state + country);
          }
        });
    });
  }
}
