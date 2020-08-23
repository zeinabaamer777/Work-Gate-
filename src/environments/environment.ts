// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  url: 'http://41.38.155.188:15150/',
  apiUrl: 'http://41.38.155.188:15150/api',
  reqHeader : new HttpHeaders({ 
    'Serial': '8920022031902003029F',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6ZWluYWIiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTU5NDYzODUwNCwiZXhwIjoxNjI2MTc0NTA0LCJpYXQiOjE1OTQ2Mzg1MDR9.xM72K2dGBg7teqqyI71hzuFXtMUe6kRx5JwQyr5QgAU',
    'ConnectionTypeXY': 'WA'
  })
};