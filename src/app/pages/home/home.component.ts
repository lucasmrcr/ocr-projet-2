import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';

interface OlympicsChartData {
  name: string,
  value: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public chartData: OlympicsChartData[] = [];
  public numberOfOlympicGames = 0;

  private olympicsSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService.getOlympics().pipe(map(olympics => {
      this.chartData = olympics.map(olympic => ({
        name: olympic.country,
        value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
      }));

      this.numberOfOlympicGames = olympics
        .flatMap(olympic => olympic.participations)
        .reduce((acc, participation) => new Set([...acc, participation.year]), new Set<number>()).size;
    })).subscribe();
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }

}
