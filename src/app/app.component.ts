import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public locationParts: string[] = [];
    public nodes: string[] = [];

    public ngOnInit(): void {
        this.locationParts = ['Users', 'mik', 'Downloads', 'test'];

        for (let i = 0; i < 54; ++i) {
            this.nodes.push(`file${i}.txt`);
        }
    }
}
