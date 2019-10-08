import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  endpoint = 'http://127.0.0.1:5000/v1/get_similars';
  suggestion: any = [];
  message = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getData(formData) {
    this.http.post(this.endpoint, formData.text).subscribe(
      data  => {
        try {
          // @ts-ignore
          this.suggestion = data.text;
          this.message = '';
        } catch (e) {
          this.suggestion = [];
          this.message = 'Nenhuma palavra similar encontrada';
        }
      },
      error  => {
        console.log('Error', error);
      });
  }

  onClickSubmit(formData) {
    this.getData(formData);
}

}
