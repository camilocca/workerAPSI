import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { WorkerApsi } from '../models/worker_apis';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private myBackurl= 'https://workerapiscamilo2021.azurewebsites.net/';
  private myAPIUrl= 'api/worker/';

  list: WorkerApsi[] = [];

  private update_form = new BehaviorSubject<WorkerApsi>({}as any);


  constructor(private http: HttpClient) {}
  
  save_worker(worker: WorkerApsi): Observable<WorkerApsi> {
      return this.http.post<WorkerApsi>(this.myBackurl + this.myAPIUrl, worker);
  }

  get_worker(){
    return this.http.get(this.myBackurl + this.myAPIUrl).toPromise()
                  .then(data =>{
                    this.list =data as WorkerApsi[];
                    console.log(this.list);
                  })
  }

  update_worker(worker: WorkerApsi){
    this.update_form.next(worker);
  }

  update_worker_end(id: number, worker: WorkerApsi): Observable<WorkerApsi>{
    return this.http.put<WorkerApsi>(this.myBackurl + this.myAPIUrl+id, worker);
  }

  get_worker$(): Observable<WorkerApsi>{
    return this.update_form.asObservable();
  }

  delete_worker(worker: WorkerApsi): Observable<WorkerApsi>{
    return this.http.delete<WorkerApsi>(this.myBackurl + this.myAPIUrl+worker.id);

  }
  
}
