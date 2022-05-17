import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { FileNode } from 'src/app/model/fileNode';

@Component({
    selector: 'app-file-node',
    templateUrl: './file-node.component.html',
    styleUrls: ['./file-node.component.scss']
})
export class FileNodeComponent implements OnInit {
    constructor(
        private ipc: IpcService,
    ) { }

    @Input()
    public node!: FileNode;

    @Output()
    public nodeSelected = new EventEmitter<FileNode>();

    public ngOnInit(): void {
        // TODO: Use preview manager to prevent EventEmitter memory leak
        this.ipc.on('previewGenerated', (args: any) => this.onPreviewGenerated(args[0], args[1]));
        this.ipc.send('generatePreview', this.node.path);
    }

    public selectNode() {
        this.nodeSelected.emit(this.node);
    }

    private onPreviewGenerated(data: any, path: string): void {
        if (path === this.node.path) {
            console.log('preview generated for', path);
        }
    }
}
