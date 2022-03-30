import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Livre} from "../_models/livre";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true'
    })
  };
  constructor(private http: HttpClient) { }

  getAllivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${environment.baseUrl}/livres`);
  }
  getivreById(LivreID:number): Observable<Livre> {
    return this.http.get<Livre>(`${environment.baseUrl}/livres/`+LivreID);
  }

  UpdateLivre(livre:Livre): Observable<Livre> {
     return this.http.put<Livre>(`${environment.baseUrl}/livres`,JSON.stringify(livre),this.httpOptions);
  }

  DeliteLivreById(LivreID: number | undefined): Observable<Livre> {
    return this.http.delete<Livre>(`${environment.baseUrl}/livres/`+LivreID);
  }
}
