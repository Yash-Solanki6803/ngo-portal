export interface APIResponse {
  status: number;
  data: {
    message: string;
    [key: string]: any;
  };
}
