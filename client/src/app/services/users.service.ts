import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = environment.userServiceURL;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.uri);
  }

  get(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  add(name) {
    return this.http.post(this.uri, { name });
  }

  delete(id) {
    return this.http.delete(`${this.uri}/${id}`);
  }

  update(id, name) {
    return this.http.put(`${this.uri}/${id}`, { name });
  }
}
