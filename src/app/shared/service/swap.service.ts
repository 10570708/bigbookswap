/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* SwapService - all API calls to BBS Swap API 
*/
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Swap } from "../model/swap.model";

@Injectable()
export class SwapService {
  searchTerm: string = '';
  SWAP_API_PATH = 'http://localhost:8080/api/v1/swap'


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
    return this.httpClient.put(this.SWAP_API_PATH, swap, this.setHeaders());
  }

  public saveSwapRequest(swap: Swap): Observable<any> {
    return this.httpClient.post(this.SWAP_API_PATH, swap, this.setHeaders());
  }

  public completeSwap(swap: Swap): Observable<any> {
    return this.httpClient.put(this.SWAP_API_PATH + '/complete', swap, this.setHeaders());
  }

  searchSwaps(searchTerm: string, id: number): Observable<any> {

    var apiUrl = this.SWAP_API_PATH + '/';

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
