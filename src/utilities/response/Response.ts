export interface ResponseInterface {
  message: string;
  status: number;
}

export class Response {
  message: string;
  status: number;
  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}