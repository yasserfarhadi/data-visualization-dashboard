export interface Daily {
  Type: number;
  Message: string;
  Data: Datum[];
  TimeFrom: number;
  TimeTo: number;
  FirstValueInArray: boolean;
  ConversionType: string;
  RateLimit: RateLimit;
  HasWarning: boolean;
}

export interface Datum {
  time: number;
  volume: number;
}

export interface RateLimit {}
