import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
    providedIn: 'root'
})
export class IpcService {
    constructor(
        private zone: NgZone
    ) {
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }

    public on(channel: string, callback: any): void {
        if (!this.ipc) {
            return;
        }

        this.ipc.on(channel, (_event, arg) => {
            this.zone.run(() => {
                callback(arg);
            });
        });
    }

    public send(channel: string, ...args: any): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }

    private ipc: IpcRenderer | undefined = void 0;
}
