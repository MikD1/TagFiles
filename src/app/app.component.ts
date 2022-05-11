import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
    }

    public folder?: string;

    public onFolderSelected(folder: string): void {
        this.folder = folder;
        // this.cdr.detectChanges();
    }
}
