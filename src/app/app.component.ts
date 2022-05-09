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

    public previewSize: number = 150;

    public zoomIn(): void {
        this.previewSize = Math.min(this.previewSize + 10, this.maxPreviewSize);
    }

    public zoomOut(): void {
        this.previewSize = Math.max(this.previewSize - 10, this.minPreviewSize);
    }

    private minPreviewSize: number = 100;
    private maxPreviewSize: number = 200;
}
