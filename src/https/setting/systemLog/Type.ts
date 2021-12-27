export interface SystemLogParamsI {
  Keyword:string;
  Level?:string;
  StartTime:string;
  EndTime:string;
  PageIndex:number;
  PageSize:number;
}

export interface SystemLogItemI {
  id: number;
  message: string;
  messageTemplate: string;
  level: string;
  timeStamp: string;
  exception: string;
  properties: string;
}