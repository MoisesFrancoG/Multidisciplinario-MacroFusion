import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://127.0.0.1:8000/api/alimentos';
  private foodurl = 'http://127.0.0.1:8000/api/usuario'
  constructor(private http: HttpClient) { }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  getFoodsId(id: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.foodurl}/${id}`)
  }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}`);
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food);
  }

  deleteAlimento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateFood(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${id}`, food);
  }

}
