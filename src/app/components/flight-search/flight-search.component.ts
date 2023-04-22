import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  
  from: any = '';
  fromLocation: any = [];
  origin: any;

  to: any = '';
  toLocation: any = [];
  destination: any;

  date: any = '';
  flights: any;

  showFind: boolean = true;
  showFlights: boolean = false;
  waitText: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  searchFromLoc() {
    if (this.from.length >= 2) {
      fetch(`http://localhost:5000/city-and-airport-search/${this.from}`)
        .then((response) => response.json())
        .then((data) => (this.fromLocation = data.data));
    }
  }

  setOrigin(location: any) {
    this.origin = location;
    this.fromLocation = [];
  }

  searchToLoc() {
    if (this.to.length >= 2) {
      fetch(`http://localhost:5000/city-and-airport-search/${this.to}`)
        .then((response) => response.json())
        .then((data) => (this.toLocation = data.data));
    }
  }

  setDest(location: any) {
    this.destination = location;
    this.toLocation = [];
  }

  onShowFlights() {
    if (this.date == '' || this.from.length == '' || this.to.length == '') {
      alert('Provide all searching details');
    } else {
      this.showFlights = true;
      this.showFind = false;
      this.waitText = true;
      fetch(
        `http://localhost:5000/flight-search?originCode=${this.origin.iataCode}&destinationCode=${this.destination.iataCode}&dateOfDeparture=${this.date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.flights = data.data;
          this.waitText = false
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}
