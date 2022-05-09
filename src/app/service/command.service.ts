import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../model/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private http: HttpClient) {
  }

  findCommandById(id: number): Observable<Command> {
    return this.http.get<Command>('api/command/' + id);
  }
}
