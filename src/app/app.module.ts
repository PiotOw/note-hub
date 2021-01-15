import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MessageComponent} from './message/message.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthModule} from './auth/auth.module';
import {AddNoteDialogComponent} from './dashboard/add-note-dialog/add-note-dialog.component';
import {DecryptNoteDialogComponent} from './dashboard/decrypt-note-dialog/decrypt-note-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {FilterNotesDialogComponent} from './dashboard/filter-notes-dialog/filter-notes-dialog.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent,
		MessageComponent,
		AddNoteDialogComponent,
		DecryptNoteDialogComponent,
		FilterNotesDialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatDialogModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		AuthModule,
		MatMenuModule,
		FormsModule,
		MatRadioModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [
		MessageComponent
	]
})
export class AppModule {
}
