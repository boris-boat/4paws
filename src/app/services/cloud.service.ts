import { Termin } from './../models/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  // apiUrl = "https://podsetnik.herokuapp.com/"
  apiUrl = "https://najboljibekend.herokuapp.com/"

  constructor(private http: HttpClient) { }
  getGalleryPhotos() {
    return this.http.get(this.apiUrl + "4paws/api/getGalleryImages")
  }
  getSalonPhotos() {
    return this.http.get(this.apiUrl + "4paws/api/getSalonImages")
  }
  getTermine() {
    return this.http.get<Termin[]>(this.apiUrl + "4paws/api/getTermine")
  }
  sendEmail(data: any) {

    return this.http.post(this.apiUrl + "4paws/api/sendEmail", data)
  }
}
