import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  url: 'http://41.38.155.188:15150/',
  apiUrl: 'http://41.38.155.188:15150/api',
  reqHeader : new HttpHeaders({ 
    'Serial': '8920022031902003029F',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6ZWluYWIiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTU5NDYzODUwNCwiZXhwIjoxNjI2MTc0NTA0LCJpYXQiOjE1OTQ2Mzg1MDR9.xM72K2dGBg7teqqyI71hzuFXtMUe6kRx5JwQyr5QgAU',
    'ConnectionTypeXY': 'WA'
  })
};
