import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
    constructor() { }

    public locationParts: string[] = [];
    public nodes: string[] = [];
    public previewSize: number = 150;

    public ngOnInit(): void {
        this.locationParts = ['Users', 'mik', 'Downloads', 'test'];

        for (let i = 0; i < 54; ++i) {
            this.nodes.push(`file${i}.txt`);
        }
    }

    public zoomIn(): void {
        this.previewSize = Math.min(this.previewSize + 10, this.maxPreviewSize);
    }

    public zoomOut(): void {
        this.previewSize = Math.max(this.previewSize - 10, this.minPreviewSize);
    }

    private minPreviewSize: number = 100;
    private maxPreviewSize: number = 200;
}
