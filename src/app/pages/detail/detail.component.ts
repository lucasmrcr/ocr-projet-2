import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from '../../core/services/olympic.service';
import {ActivatedRoute} from '@angular/router';
import {map, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  public country: string | null = null;
  public entries = 0;
  public medals = 0;
  public athletes = 0;
  public chartData: LineChartData[] = [];
  public loading = true;
  public error = false;
  private olympicSubscription: Subscription | null = null;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country');
    if (this.country) {
      this.olympicSubscription = this.olympicService.getOlympicsByCountry(this.country).pipe(
        map(olympic => {
          this.loading = false;
          if (!olympic) return;
          this.entries = olympic.participations.length;
          this.medals = olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
          this.athletes = olympic.participations.reduce((acc, participation) => acc + participation.athleteCount, 0);
          this.chartData = [{
            name: 'Nombre de médailles par jeu',
            series: olympic.participations.map(participation => ({
              name: participation.year + '',
              value: participation.medalsCount
            }))
          }];
        }),
        catchError((error, caught) => {
          this.error = true;
          console.error(error);
          return caught;
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.olympicSubscription?.unsubscribe();
  }

}
