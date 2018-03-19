import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { APIResponse } from "../../../common/interfaces/api-response.interface";
import { HttpService } from "../../../common/services/http.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html"
})

export class SearchComponent {
  searchTerms: string;

  results: Object;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchTerms = params['terms'];

      this.httpService.get('search/' + this.searchTerms)
        .subscribe((data: APIResponse) => this.results = data.data)  
    });
  }

  getTitle() {
    return 'Results for "' + this.searchTerms + '"';
  }
}
