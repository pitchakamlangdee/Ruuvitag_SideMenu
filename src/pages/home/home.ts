import { Component, ViewChild } from "@angular/core";
import { NavController, Slides } from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Slides)
  slides: Slides;
  // numbers = [0, 1, 2];
  // firstLoad = true;
  select_mac_home: any;
  sensors_data_last :any;
  selectedItem :any;
  numbers = ["a", "b", "c", "d", "e"];

  constructor(
    public navCtrl: NavController,
    public sensorsApiProvider: SensorsApiProvider
  ) {
    
  }
  ionViewDidLoad(){
    this.getMacSelectHome();
  }
  getMacSelectHome() {
    
    this.sensorsApiProvider.getMacSelect().then(select_mac => {
      this.select_mac_home = select_mac;
      console.log(this.select_mac_home);
        this.selectedItem = this.select_mac_home;
      //  this.selectedItem[1] = this.select_mac_home[1].mac_id;
      //this.selectedItem = this.select_mac_home;
      console.log(this.selectedItem[0].mac_id)
      // for (let i in this.select_mac_home) {
      //   this.selectedItem[i] = this.select_mac_home[i].mac_id;
      //   console.log(this.selectedItem)
      // }
      console.log(this.selectedItem)
      this.getFirstLastDataSensors();
    });
    
  }
  getFirstLastDataSensors() {
        console.log(this.selectedItem);
        this.sensors_data_last = this.selectedItem;
        console.log(this.sensors_data_last);
    
    for (let i in this.selectedItem) {
      //console.log(this.selectedItem[i]);
      this.sensorsApiProvider 
        .getLastDataSensors(this.selectedItem[i].mac_id)
        .then(data_last => { 
          this.sensors_data_last[i] = data_last[0];
          //this.sensors_data_last[i+1] = "";
          console.log(this.sensors_data_last[i]);
        });
      }
  }

  getLastDataSensors() {
    // this.sensorsApiProvider 
    //     .getLastDataSensors(this.selectedItem[0])
    //     .then(data_last => {
    //       this.sensors_data_last[0] = data_last[0];
    //       console.log(this.sensors_data_last)
    //     });
    //     this.sensorsApiProvider 
    //     .getLastDataSensors(this.selectedItem[1])
    //     .then(data_last => {
    //       this.sensors_data_last[1] = data_last[0];
    //     });
    
        console.log(this.selectedItem);
        this.sensors_data_last = this.selectedItem;
        console.log(this.sensors_data_last);
    
    for (let i in this.selectedItem) {
      //console.log(this.selectedItem[i]);
      this.sensorsApiProvider 
        .getLastDataSensors(this.selectedItem[i])
        .then(data_last => { 
          this.sensors_data_last[i] = data_last[0];
          //this.sensors_data_last[i+1] = "";
          console.log(this.sensors_data_last[i]);
        });
      }
    
    // console.log(this.sensors_data_last);
  }
  slideChanged() {
    //this.slides.slidePrev(0);
    let currentIndex = this.slides.getActiveIndex();
   
    console.log('Current index is', currentIndex);
  }
  // ngAfterViewInit() {
  //   this.slides.freeMode = true;
  // }
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
