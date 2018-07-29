import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'x-www-form-urlencoded'
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.resolve([]);
  }

  private extractData(res: Response) {
    const body = res;
    console.log(body);
    return body;
  }

  getTodos() {
    return this.http.get("http://localhost:3000").map(this.extractData).catch(this.handleError);
  }

  postTodos(obj) {
    console.log("post method 0", obj);
    return this.http.post<any>("http://localhost:3000/addtask", JSON.stringify(obj), httpOptions).map(this.extractData).catch(this.handleError);
  }
  deleteTodos(obj) {
    // console.log("delete method 0",obj);
    return this.http.post<any>("http://localhost:3000/deleteTask", JSON.stringify(obj), httpOptions).catch(this.handleError);
  }
  updateTodo(obj) {
    return this.http.put<any>("http://localhost:3000/updateTask", JSON.stringify(obj), httpOptions).map(this.extractData).catch(this.handleError);
  }
}
