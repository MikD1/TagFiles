import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
    providedIn: 'root'
})
export class IpcService {
    constructor() {
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

    public on(channel: string, listener: (event: any, ...args: any[]) => void): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.on(channel, listener);
    }

    public send(channel: string, ...args: any): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }

    private ipc: IpcRenderer | undefined = void 0;
}
