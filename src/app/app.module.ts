import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/common/material.module';
import { MainViewComponent } from './main-view/main-view.component';
import { OpenFolderViewComponent } from './open-folder-view/open-folder-view.component';
import { FileNodeComponent } from './main-view/file-node/file-node.component';

@NgModule({
    declarations: [
        AppComponent,
        MainViewComponent,
        OpenFolderViewComponent,
        FileNodeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
