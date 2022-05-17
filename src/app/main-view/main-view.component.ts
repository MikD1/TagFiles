import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IpcService } from '../ipc.service';
import { FileNode } from '../model/fileNode';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnChanges {
    constructor(
        private ipc: IpcService,
    ) { }

    @Input()
    public location?: string;

    public locationParts: string[] = [];
    public nodes: FileNode[] = [];
    public previewSize: number = 150;

    public ngOnInit(): void {
        this.ipc.on('nodesLoaded', (args: any) => this.onNodesLoaded(args[0]));
        this.ipc.on('previewGenerated', (args: any) => this.onPreviewGenerated(args[0], args[1]));
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['location']?.currentValue) {
            this.setLocation(changes['location'].currentValue);
        }
    }

    public selectNode(node: FileNode) {
        if (node.isDirectory) {
            this.setLocation(node.path);
        }
    }

    public locationUp(): void {
        let parent = this.ipc.sendSync('getParentDirectory', this.location);
        if (parent) {
            this.setLocation(parent);
        }
    }

    public zoomIn(): void {
        this.previewSize = Math.min(this.previewSize + 10, this.maxPreviewSize);
    }

    public zoomOut(): void {
        this.previewSize = Math.max(this.previewSize - 10, this.minPreviewSize);
    }

    private setLocation(location: string): void {
        this.location = location;
        this.locationParts = location.split('/').filter(part => part !== '');
        this.ipc.send('loadNodes', location);
    }

    private onNodesLoaded(data: any[]): void {
        this.nodes = data;

        this.ipc.send('generatePreview', this.nodes[0].path);
    }

    private onPreviewGenerated(data: any, path: string): void {
        console.log(path);
        console.log(data);
    }

    private minPreviewSize: number = 100;
    private maxPreviewSize: number = 200;
}
