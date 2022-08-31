import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Swap } from "../model/swap.model";

@Injectable()
export class SwapService {
  searchTerm: string = '';

  constructor(private httpClient: HttpClient) { }

  private setHeaders(): any {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options = { headers: httpHeaders };

    return options;
  }

  
  public acceptSwapRequest(swap: Swap): Observable<any> {
    return this.httpClient.put('http://localhost:8080/api/v1/swap', swap, this.setHeaders());
  }

  public saveSwapRequest(swap: Swap): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/swap', swap, this.setHeaders());
  }

  public completeSwap(swap: Swap) : Observable<any>{
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
  });
  let options = {
      headers: httpHeaders, withCredentials: true
  };
    return this.httpClient.put('http://localhost:8080/api/v1/swap/complete', swap, options);
  }

  searchSwaps(searchTerm: string, id: number) : Observable<any>{

    var apiUrl = 'http://localhost:8080/api/v1/swap/';

    switch (searchTerm) {
      case 'sent':
        apiUrl += 'requests/' + id;
        break;
      case 'received':
        apiUrl += 'offers/' + id;
        break;
      case 'pending':
        apiUrl += 'pending/' + id;
        break;
      case 'done':
        apiUrl += 'complete/' + id;
        break;
      default:
        apiUrl += 'all/' + id;
    }

    return this.httpClient.get(apiUrl);

  }

} 
