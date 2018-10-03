import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Slides  } from "ionic-angular";
import chartJs from "chart.js";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";

@Component({
  selector: "page-graphs",
  templateUrl: "graphs.html"
})
export class GraphsPage {

  @ViewChild(Slides) slides: Slides;

  @ViewChild("barCanvas")
  barCanvas;
  @ViewChild("lineCanvas")
  lineCanvas;
  @ViewChild("pieCanvas")
  pieCanvas;
  @ViewChild("doughnutCanvas")
  doughnutCanvas;

  select_mac_graphs: any;
  myDate :any;
  selectedItemGraphs : any;
  barChart: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;
  

  
  mac_address = [];
  Name_Ruuvitag = [];
  temperature = [];
  pressure = [];
  time_Stamp = [];
  time = [];
  date = [];
  humidity = [];
  average_temperature : any = 0;
  sum_temperature : any = 0;
  average_humidity : any = 0;
  sum_humidity : any = 0;
  
  //getGraphsData

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensorsApiProvider: SensorsApiProvider
  ) {
    this.getMacSelectGraphs(); 
    
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  getMacSelectGraphs() {
    this.sensorsApiProvider.getMacSelect().then(select_mac => {
      this.select_mac_graphs = select_mac;
      console.log(this.select_mac_graphs);
      
    });
  }

  getGraphsDataDay() {
   let count : number = 0;
    
    this.sensorsApiProvider.getGraphsDataDay(this.myDate, this.selectedItemGraphs).then(data => {
      for (let i in data) {
        this.mac_address[i] = data[i].mac_id;
        this.Name_Ruuvitag[i] = data[i].Name_Ruuvitag;
        this.temperature[i] = data[i].temperature;
        this.pressure[i] = data[i].pressure;
        this.time_Stamp[i] = data[i].Time_Stamp.split(" ", 2);
        this.date[i] = this.time_Stamp[i][0];
        this.time[i] = this.time_Stamp[i][1];
        this.humidity[i] = data[i].humidity;
        this.sum_temperature += parseFloat(data[i].temperature);
        this.sum_humidity += parseFloat(data[i].humidity);
        count ++;
        
        
      }
      if(this.sum_temperature != undefined && this.sum_humidity != undefined ){
      this.average_temperature = (this.sum_temperature / count).toFixed(2);
      this.average_humidity = (this.sum_humidity / count).toFixed(2);
      }
       console.log(this.average_temperature);
       console.log(this.average_humidity);
       //console.log(time);
       this.getLineChart();
       this.getBarChart();
    });
    
  }

  /////////////////////////////////////start function graph//////////////////////////////
  ngAfterViewInit() {
    setTimeout(() => {
      this.lineChart = this.getLineChart();
      this.barChart = this.getBarChart();
    }, 150);
    // setTimeout(() => {
    //   this.pieChart = this.getPieChart();
    //   this.doughnutChart = this.getDoughnutChart();
    // }, 250);
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    });
  }
  getLineChart() {
    const data = {
      labels: this.time,
      datasets: [
        {
          label: "temperature",
          fill: true,
          LineTension: 0.1,
          backgroundColor: "rgb(0, 178, 255)",
          borderColor: "rgb(231, 205, 35)",
          borderCapStyle: "butt",
          borderJoinStyle: "mitter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.temperature,
          scanGaps: false
        },
        {
          label: "humidity",
          fill: true,
          LineTension: 0.1,
          backgroundColor: "rgb(117, 0, 49)",
          borderColor: "rgb(51, 50, 46)",
          borderCapStyle: "butt",
          borderJoinStyle: "mitter",
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.humidity,
          scanGaps: false
        }
      ]
    };
    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }
  getBarChart() {
    const data = {
      labels: ["","temperature", "humidity"],
      datasets: [
        {
          label: ["average weather"],
          data: ["",this.average_temperature, this.average_humidity],
          backgroundColor: [
            "rgb(84, 132, 80)",
            "rgb(20, 0, 255)",
            "rgb(255, 230, 0)",
            "rgb(0, 255, 10)",
            "rgb(60, 0, 70)"
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            tickes: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
  }
 

  // getPieChart() {
  //   const data = {
  //     labels: ["Vermelho", "Azul", "Amarelo"],
  //     datasets: [
  //       {
  //         data: [300, 75, 224],
  //         backgroundColor: ["reb(200,6,0)", "rgb(36,0,255)", "rgb(242,255,0)"]
  //       }
  //     ]
  //   };

  //   return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  // }

  // getDoughnutChart() {
  //   const data = {
  //     labels: ["Vermelho", "Azul", "Amarelo"],
  //     datasets: [
  //       {
  //         label: "Teate Chart",
  //         data: [12, 65, 32],
  //         backgroundColor: [
  //           "rgb(0, 244, 97)",
  //           "rgb(37, 39, 43)",
  //           "rgb(255, 207, 0)"
  //         ]
  //       }
  //     ]
  //   };
  //   return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  // }
}
