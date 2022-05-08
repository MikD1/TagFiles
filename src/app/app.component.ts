import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public nodes: string[] = [];

    public ngOnInit(): void {
        for (let i = 0; i < 54; ++i) {
            this.nodes.push(`file${i}.txt`);
        }
    }
}
