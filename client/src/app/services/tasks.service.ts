import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  uri = environment.taskServiceURL;
  constructor(private http: HttpClient) {}

  list(userId) {
    return this.http.get(`${this.uri}/${userId}`);
  }

  add(userId, description) {
    return this.http.post(`${this.uri}/${userId}`, { description });
  }

  updateDesc(id, description) {
    return this.http.put(`${this.uri}/${id}`, { description });
  }
  updateState(id, state) {
    return this.http.put(`${this.uri}/${id}`, { state });
  }
}
