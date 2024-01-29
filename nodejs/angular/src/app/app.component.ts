import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  workers: { n: number; cost: number }[] = [];
  ngOnInit(): void {
    for (let i = 0; i < navigator.hardwareConcurrency; i++) {
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      this.workers[i] = { n: 0, cost: 0 };
      worker.onmessage = (({ data }: any) => {
        this.workers[i].n++;
        this.workers[i].cost += data.cost;
        worker.postMessage({});
      }).bind(this);
      worker.postMessage({});
    }
  }
}
