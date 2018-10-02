import { Component , ViewChild } from "@angular/core";
import { NavController , Slides } from "ionic-angular";
import { SensorsApiProvider } from '../../providers/sensors-api/sensors-api';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  // numbers = [0, 1, 2];
  // firstLoad = true;
  select_mac_home: any;
  sensors_data_last: any;
  selectedItem = [];
  numbers = ["a","b","c","d","e"];
  
  
  
  constructor(public navCtrl: NavController, public sensorsApiProvider: SensorsApiProvider) {
    this.getMacSelectHome();
    

  }
  getMacSelectHome() {
    this.sensorsApiProvider.getMacSelect()
    .then(select_mac => {
      this.select_mac_home = select_mac;
      //console.log(this.select_mac_home);
      //  this.selectedItem[0] = this.select_mac_home[0].mac_id;
      //  this.selectedItem[1] = this.select_mac_home[1].mac_id;
      
      for(let i in this.select_mac_home){
      this.selectedItem[i] = this.select_mac_home[i].mac_id;
      }
      //this.getLastDataSensors();
    });
  }

  getLastDataSensors(){
    console.log(this.selectedItem);
    console.log(this.numbers);
    this.sensorsApiProvider.getLastDataSensors(this.selectedItem)
    
    .then(data_last => {
      this.sensors_data_last = data_last;
      //console.log(this.sensors_data_last);
    });
    


  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    //console.log('Current index is', currentIndex);
  }



  




  // loadPrev() {
  //   console.log("Prev");
  //   let newIndex = this.slider.getActiveIndex();

  //   newIndex++;
  //   this.numbers.unshift(this.numbers[0] - 1);
  //   this.numbers.pop();

  //   // Workaround to make it work: breaks the animation
  //   this.slider.slideTo(newIndex, 0, false);

  //   console.log(`New status: ${this.numbers}`);
  // }

  // loadNext() {
  //   if (this.firstLoad) {
  //     // Since the initial slide is 1, prevent the first
  //     // movement to modify the slides
  //     this.firstLoad = false;
  //     return;
  //   }

  //   console.log("Next");
  //   let newIndex = this.slider.getActiveIndex();

  //   newIndex--;
  //   this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
  //   this.numbers.shift();

  //   // Workaround to make it work: breaks the animation
  //   this.slider.slideTo(newIndex, 0, false);

  //   console.log(`New status: ${this.numbers}`);
  // }
}
