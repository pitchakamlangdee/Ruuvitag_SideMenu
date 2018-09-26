import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SensorsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class SensorsApiProvider {
  apiUrl = 'http://localhost:8080/Ruuvitag';
  constructor(public http: HttpClient) {
    console.log('Hello SensorsApiProvider Provider');

  }
  getSensors() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +'/API_Ruuvitag.php/').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getLastSelectSensors() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +'/API_Last_Ruuvitag.php/').subscribe(select_data_last => {
        resolve(select_data_last);
      },
        err => {
          console.log(err);
        });
    });
  }
  getLastDataSensors(mac_id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl +'/API_Last_Ruuvitag.php/').subscribe(data_last => {
        resolve(data_last);
      },
        err => {
          console.log(err);
        });
    });
  }



}

