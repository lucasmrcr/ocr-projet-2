import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public chartData: ChartData[] = [];
  public numberOfOlympicGames = 0;

  private olympicsSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService.getOlympics().pipe(map(olympics => {
      // Transform data to match to the chart lib requirements
      this.chartData = olympics.map(olympic => ({
        name: olympic.country,
        value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
      }));

      // Calculate number of olympic games by taking size of a set where is stored all participation years.
      // The set assures us that there is no duplicate
      this.numberOfOlympicGames = olympics
        .flatMap(olympic => olympic.participations)
        .reduce((acc, participation) => new Set([...acc, participation.year]), new Set<number>()).size;
    })).subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed so that it can't produce memory leaks or side effects
    this.olympicsSubscription?.unsubscribe();
  }

  onSelect(event: ChartData): void {
    void this.router.navigate(['/', event.name])
  }

}
