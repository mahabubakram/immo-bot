import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {WebSocketService} from '../core/services/webSocket.service';
import {RestService} from "../core/services/rest.service";
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {TimePipe} from "../shared/pipes/time-pipe/time.pipe";

@Component({
  selector: 'app-dashboard',
  providers: [WebSocketService, RestService, TimePipe],
  moduleId: module.id,
  templateUrl: './dashboard-sensor.component.html',
  styleUrls: ['./dashboard-sensor.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  title: string;
  size: string = '8em';
  color: string = '#C20000';
  dataList: any = [{}];
  lastEventDate: any;
  chartsDateList: any = [];
  latency: Object;
  sensorName: string;


  constructor(private activatedRoute: ActivatedRoute, private monitor: WebSocketService, private restServices: RestService, private timePipe: TimePipe) {
    this.title = 'netIOT Connectivity Kit – Sensor to Cloud';
    this.latency = {
      runtime: ''
    };

    this.activatedRoute.data.subscribe((params: Params) => {
      this.sensorName = params['sensor'];
    });

    /**
     * This service call is done via webSocket and it will show the direct output of the node-red
     */
    this.monitor.GetInstanceStatus(this.sensorName).subscribe((result) => {

      console.log('sensor event ' + result);

      console.log(result);
      let parsedJson = JSON.parse(result);
      if (parsedJson.d && parsedJson.d.sensors) { //only if sensors date are fetched
        parsedJson = parsedJson.d.sensors[0];
        // console.log(parsedJson)
         this.jsonMapping(this.dataList, parsedJson);
        // console.log('In ws');
        // console.log(parsedJson)

      }//end of IF condition. only get the sensors
      else {
        this.latency['responsedTime'] = '';
        this.latency['runtime'] = '';

        if(parsedJson.d.index >= 0 && parsedJson.d.index <= 65535 ){
          console.log('Sensor to Cloud');

          this.latency['led'] = true;
          setTimeout(() => {
            this.latency['led'] = false;
          }, 2000);
        }
        else {
          /**
           * This is the rest call to the cloudant Db via local server
           */
          this.restServices.getCloudantDocs(parsedJson.d.index, this.sensorName).subscribe((restResult) => {
            console.log('Cloud to Sensor ' + restResult);
            this.latency['led'] = true;
            this.latency['responsedTime'] = new Date(parsedJson.d.timestamp);
            this.latency['runtime'] = Math.abs(new Date(this.latency['responsedTime']).getTime() - new Date(this.latency['requestedTime']).getTime());
            setTimeout(() => {
              this.latency['led'] = false;
            }, 2000);

            console.log(this.latency)
          });
          /**
           * End of REST Call
           */
        }

      }
    });


    this.setInt();
  }

  ngOnInit() {
    this.restServices.getLastEvent(this.sensorName).subscribe((lastResult) => {
      let lastEvent = lastResult['docs'][0]['d'].sensors[0];
      // console.log(this.dataList[0])
      // console.log(Object.keys(this.dataList[0]).length)
      if (this.dataList && Object.keys(this.dataList[0]).length === 0) {
        this.jsonMapping(this.dataList, lastEvent);
        // console.log('In rest');
        // console.log(lastEvent)
      }
    })
  }

  jsonMapping(toJson, fromJson) {

    let tempData = {
      'productName': fromJson.productName,
      'vendorName': fromJson.vendorName,
      'serialNumber': fromJson.serialNumber,
      'networkType': fromJson.networkType,
      'connected': fromJson.connectivity.connectedStatus,
      'distance': fromJson.measurements[0].distance,
      'distanceUnit': fromJson.measurements[0].distanceUnit,
      'currentDate': new Date()
    };

    let measurements = {
      'distance': {
        name: 'Distance',
        data: []
      },
      'timestamp': {
        name: 'Event Log',
        data: []
      },
    }
    fromJson.measurements.forEach((item) => {
      measurements.distance.data.push(parseFloat(item.distance));
      const dateTime = new Date(item.timestamp);
      const legendTime = this.timePipe.transform(dateTime);// dateTime.getHours() + 'H:' + dateTime.getMinutes() + 'M:' + dateTime.getSeconds() + 'S:' + dateTime.getMilliseconds() + 'ms';
      this.chartsDateList.push(new Date());
      measurements.timestamp.data.push(legendTime);
    });

    if (toJson.length > 0) {
      toJson.splice(0, 1);
    }
    toJson.push(tempData);
    this.lastEventDate = new Date();

    if(this.chart.datasets[0].data.length > 30){
      this.chart.datasets[0].data.splice(0,1);
      this.chart.labels.splice(0,1);
      this.chart.chart.update();
    }

    this.chart.datasets[0].data.push(measurements.distance.data[0]);
    this.chart.labels.push(measurements.timestamp.data[0]);
    this.chart.chart.update();

  }

  onChangeDistanceMetric(eventValue, itemValue): number {
    if (eventValue === 'm') {
      itemValue = itemValue / 100;
    }
    else {
      itemValue = itemValue * 100;
    }
    console.log(itemValue)
    console.log(eventValue)
    return itemValue;
  }

  measureLatency(): number {
    this.latency['led'] = false;

    /**
     * This is the rest call to the on demand http request
     */
    this.restServices.demandLatencyCheck('demand-' + this.sensorName).subscribe((restResult) =>{
      // console.log(restResult);
      this.latency['requestedTime'] = new Date(restResult['createdAt']);
      // console.log(this.latency)
    });
    /**
     * End of REST Call
     */
    return;

  }



  public lineChartData: Array<any> = [
    {data: [0], label: 'Series Distance', lineTension: 0.1}
  ];
  public lineChartLabels: Array<any> = [''];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  setInt() {
/*    setInterval(() => {
      let cDate = new Date();
      if (((cDate.getTime() / 1000) - (this.lastEventDate.getTime() / 1000)) > 2) {
        // this.clearJsonMapping(this.dataList);
        this.dataList[0]['productName'] = '';
        this.dataList[0]['vendorName'] = '';
        this.dataList[0]['serialNumber'] = '';
        this.dataList[0]['networkType'] = '';
        this.dataList[0]['connected'] = 'disconnected';
        this.dataList[0]['distance'] = '';
        this.dataList[0]['distanceUnit'] = '';
        this.dataList[0]['currentDate'] = '';
      }
      // console.log(this.dataList);


    }, 2000);*/
  }


}
