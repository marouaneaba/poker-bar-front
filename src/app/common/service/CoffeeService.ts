import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Coffee} from '../../coffee/model/coffee.model';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class CoffeeService {
  public constructor(private httpClient: HttpClient) {}

  public getCoffees(): Observable<Coffee[]> {
    return this.httpClient
      //.get<Coffe[]>(`${environment.host}${Urls.COFFEE}`);
      .get<Coffee[]>(`${environment.host}/Coffee`);
  }

  public getSelectedCoffees(): Observable<Coffee[]> {
    return this.httpClient
      .get<Coffee[]>(`${environment.host}/Coffee`,
        {
          params: new HttpParams().set('selected', 'true')
        })
  }

  public getAvailableCoffe(): Observable<Coffee[]> {
    return this.httpClient
      .get<Coffee[]>(`${environment.host}/Coffee`,
        {
          params: new HttpParams().set('available', 'true')
        })
  }

  public searchCoffeeByName(keyword: string): Observable<Coffee[]>{
    return this.httpClient
      .get<Coffee[]>(`${environment.host}/Coffee`,
        {
          params: new HttpParams().set('name_like', keyword)
        })
  }

  public selectCoffee(coffee: Coffee): Observable<Coffee>{
    return this.httpClient
      .put<Coffee>(`${environment.host}/Coffee/${coffee.id}`,this.getCoffeeSelectReverse(coffee))
  }

  public deleteCoffee(coffee: Coffee) {
    return this.httpClient
      .delete(`${environment.host}/Coffee/${coffee.id}`)
  }

  public createCoffe(dataForm: any) {
    console.log(dataForm);
    return this.httpClient
      .post(`${environment.host}/Coffee/`,dataForm)
  }

  public getCoffeeSelectReverse(coffee: Coffee): Coffee{
    coffee.selected = !coffee.selected
    return coffee
  }

  public getCoffeeById(id: number): Observable<Coffee>{
    return this.httpClient
      .get<Coffee>(`${environment.host}/Coffee/${id}`)
  }

  public saveCoffee(coffee: Coffee): Observable<Coffee> {
    return this.httpClient
      .put<Coffee>(`${environment.host}/Coffee/${coffee.id}`,coffee)
  }
}
