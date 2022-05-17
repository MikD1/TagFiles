import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IpcService } from '../ipc.service';

@Component({
    selector: 'app-open-folder-view',
    templateUrl: './open-folder-view.component.html',
    styleUrls: ['./open-folder-view.component.scss']
})
export class OpenFolderViewComponent implements OnInit {
    constructor(
        private readonly ipc: IpcService
    ) { }

    @Output()
    public folderSelected = new EventEmitter<string>();

    public ngOnInit(): void {
        this.ipc.on('folderSelected', (args: any) => {
            this.folderSelected.emit(args[0]);
        });
    }

    public openFolder(): void {
        this.ipc.send('openFolder');
    }
}
