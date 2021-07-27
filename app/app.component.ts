import { Component, OnInit } from '@angular/core';
import { SelectService } from './select.service';
import { Country } from './country';
import { State } from './state';
//import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular 5';

  selectedCountry: Country = new Country(0, 'Select');
  selectedState = 0;
  countries: Country[];
  states: State[];
  stateName: string;
  value: number = 0;

  constructor(private selectService: SelectService) {}

  ngOnInit() {
    this.countries = this.selectService.getCountries();
    this.states = this.selectService.getStates();
    this.onSelect(this.selectedCountry.id);
  }

  onSelect(countryid) {
    this.states = this.selectService
      .getStates()
      .filter(item => item.countryid == countryid);
  }
  onSelectState(stateid) {
    this.stateName = this.selectService
      .getStates()
      .filter(item => item.id == stateid)[0].name;
  }

  getDropDownText(id, object) {
    const selObj = _.filter(object, function(o) {
      return _.includes(id, o.id);
    });
    return selObj;
  }
}
