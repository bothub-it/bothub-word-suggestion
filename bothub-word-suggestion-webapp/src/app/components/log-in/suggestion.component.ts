import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  endpoint = 'http://suggestions-api.ilhasoft.dev/v1/get_similars';
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
