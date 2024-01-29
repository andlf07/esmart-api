export interface ResponseInterface {
  data?: any;
  message?: string;
  statusCode?: number;
  error?: any;
  pagination?: {
    count: number;
    page: any;
    pageSize: any;
    totalPages: number;
  };
}
