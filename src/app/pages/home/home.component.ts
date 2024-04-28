import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from '../../core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null | undefined> = of(null);
  public data: { name: string, value: number }[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((olympics) => {
      if (olympics) {
        this.data = olympics.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.length
        }));
      }
    });
  }
}
