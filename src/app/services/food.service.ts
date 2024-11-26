import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { FoodConsumption } from '../models/food-consumption';
import { ListaAlimentos } from '../models/lista-alimentos';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://127.0.0.1:8000/api/alimentos';
  private foodurl = 'http://127.0.0.1:8000/api/usuario';
  private consumoUrl = 'http://127.0.0.1:8000/api/consumo/dia';
  private FoodConsumption = 'http://127.0.0.1:8000/api/lista';
  private getFoodListConsumption = 'http://127.0.0.1:8000/api/listaalimentos';

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

  // Función para obtener el idconsumo
  getConsumoId(userId: number): Observable<{ idconsumo: number }> {
    return this.http.get<{ idconsumo: number }>(`${this.consumoUrl}/${userId}`);
  }

  // Método para hacer POST del alimento con la nueva categoría y porción
  postFoodConsumption(food: ListaAlimentos): Observable<ListaAlimentos> {
    return this.http.post<ListaAlimentos>(this.FoodConsumption, food);
  }

  // Método para obtener los alimentos por idcomida
  getFoodListByConsumption(idcomida: number): Observable<FoodConsumption[]> {
    return this.http.get<FoodConsumption[]>(`${this.getFoodListConsumption}/${idcomida}`);
  }

  deleteFoodConsumption(id: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:8000/api/list/${id}`);
  }

     updateFoodConsumption(id: number, updatedData: ListaAlimentos): Observable<ListaAlimentos> {
      console.log('Enviando datos para actualizar:', updatedData);
      return this.http.put<ListaAlimentos>(`http://127.0.0.1:8000/api/lista/${id}`, updatedData);
    }



}
