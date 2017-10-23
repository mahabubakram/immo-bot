import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  private actionUrl: string;
  private websocket: any;
  private receivedMsg: any;

  private webSocketUrl: string;

  public sendMessage(text:string){
    this.websocket.send(text);
  }

  public GetInstanceStatus(sensorName): Observable<any>{
    this.webSocketUrl = "wss://mw-testiot-app.eu-gb.mybluemix.net/ws/" + sensorName; //websocket address
    this.websocket = new WebSocket(this.webSocketUrl);
    this.websocket.onopen =  (evt) => {
      //this.websocket.send("Hello World");
      console.log('websocket is open');
    };

    return Observable.create(observer=>{
      this.websocket.onmessage = (evt) => { //receiving websocket messages
        observer.next(evt);
      };
    })
      .map(res=>res.data)
      .share();
  }

  public GetSensor2InstanceStatus(): Observable<any>{
    this.webSocketUrl = "wss://mw-testiot-app.eu-gb.mybluemix.net/ws/sensor2"; //websocket address for sensor2
    this.websocket = new WebSocket(this.webSocketUrl);
    this.websocket.onopen =  (evt) => {
      console.log('websocket is open');
    };

    return Observable.create(observer=>{
      this.websocket.onmessage = (evt) => { //receiving websocket messages
        observer.next(evt);
      };
    })
      .map(res=>res.data)
      .share();
  }



}
