import { Component, OnInit } from '@angular/core';
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

    public ngOnInit(): void {
        this.ipc.on('resp', (event: any, arg: any) => {
            console.log(arg);
        });
    }

    public openFolder(): void {
        this.ipc.send('req', 'data from renderer');
    }
}
