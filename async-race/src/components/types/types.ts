export enum Status {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  TOOMANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Headers {
  TOTAL_COUNT = 'X-Total-Count',
  CONTENT_TYPE = 'Content-Type',
}

export enum Method {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export interface Car {
  name: string;
  color: string;
  id?: number;
}

export type Garage = Car[];

export interface GarageData {
  garage: Garage;
  total: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export enum EngineStatus {
  STOP = 'stopped',
  START = 'started',
  DRIVE = 'drive',
}

export interface Drive {
  success: boolean;
}
