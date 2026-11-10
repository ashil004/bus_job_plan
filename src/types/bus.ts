// src/types/bus.ts
export interface Bus {
  id: string;
  name: string;
  image: string;
  startPoint: string;
  endPoint: string;
  stoppings: string[];
  baseFare: number;
  perKmFare: number;
  isGovernmentApproved: boolean;
}

export interface ExamCenterInfo {
  rollStart: number;
  rollEnd: number;
  centerName: string;
  centerAddress: string;
  nearestStop: string;
  distanceKm: number;
  googleMapUrl: string;
}

export interface ExamData {
  id: string;
  title: string;
  organization: string;
  date: string;
  time: string;
  reportingTime: string;
  noticeUrl?: string;
  centers: ExamCenterInfo[];
}