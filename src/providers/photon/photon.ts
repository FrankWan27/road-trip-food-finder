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
  public data: any;

  constructor(public http: Http) {

  }

  autocomplete(query: any) {
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://photon.komoot.de/api/?q=' + query + '&limit=10')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
          for(let i = 0; i < 10; i++)
          {
            let name = '', street = '', city = '', state = '', country = '';

            
            if(this.data.features[i].properties.name != undefined)
              name = 'Name: ' + this.data.features[i].properties.name;
            
            if(this.data.features[i].properties.street != undefined) 
              street = ', Street: ' + this.data.features[i].properties.street;
            
            if(this.data.features[i].properties.city != undefined)
              city = ', City: ' + this.data.features[i].properties.city;
            
            if(this.data.features[i].properties.state != undefined)
              state = ', State: ' + this.data.features[i].properties.state;
            
            if(this.data.features[i].properties.country != undefined)
              country = ', Country: ' + this.data.features[i].properties.country;

            // if(name == city) state = '';
            // if(state == country) country = '';

            console.log(name + street + city + state + country);
          }
        });
    });
  }
}
