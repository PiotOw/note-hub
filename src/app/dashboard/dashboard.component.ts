import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FilterNotesDialogComponent} from './filter-notes-dialog/filter-notes-dialog.component';
import {NoteTypeEnum} from '../note/note-type.enum';
import {AddNoteDialogComponent} from './add-note-dialog/add-note-dialog.component';
import {Note} from '../note/note.model';
import {DecryptNoteDialogComponent} from './decrypt-note-dialog/decrypt-note-dialog.component';
import {sha256} from 'js-sha256';
import {FileModel} from '../file/file.model';
import * as FileSaver from 'file-saver';
import {FileService} from '../file/file.service';
import {NoteService} from '../note/note.service';
import {LoginService} from '../auth/login.service';

declare var require: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	NOTES: Note[];
	FILES: FileModel[];

	NoteTypeEnum = NoteTypeEnum;

	filters: NoteTypeEnum[] = [
		NoteTypeEnum.PRIVATE,
		NoteTypeEnum.PROTECTED,
		NoteTypeEnum.PUBLIC
	];

	constructor(private dialog: MatDialog,
				private fileService: FileService,
				private noteService: NoteService,
				private loginService: LoginService) {
	}

	ngOnInit(): void {
		this.noteService.fetchAllNotes().subscribe(res => {
			this.NOTES = res;
		});

		this.fileService.fetchAllFiles().subscribe(res => {
			this.FILES = res;
		})
	}

	filterNotes() {
		const dialogRef = this.dialog.open(FilterNotesDialogComponent);
		dialogRef.componentInstance.notePrivate = this.filters.includes(NoteTypeEnum.PRIVATE);
		dialogRef.componentInstance.notePublic = this.filters.includes(NoteTypeEnum.PUBLIC);
		dialogRef.componentInstance.noteProtected = this.filters.includes(NoteTypeEnum.PROTECTED);
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.filters = result;
			}
		})
	}

	addNote() {
		const dialogRef = this.dialog.open(AddNoteDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (result.noteType === NoteTypeEnum.PROTECTED) {
					const aesjs = require('aes-js');
					const key = sha256.update(result.password).digest();
					const text = result.content;
					const textBytes = aesjs.utils.utf8.toBytes(text);
					const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
					const encryptedBytes = aesCtr.encrypt(textBytes);
					result.content = aesjs.utils.hex.fromBytes(encryptedBytes);
				}
				const newNote: Note = {
					title: result.title,
					content: result.content,
					type: result.noteType
				}
				this.NOTES.push(newNote);
			}
		})
	}

	decryptNote(note: Note) {
		const dialogRef = this.dialog.open(DecryptNoteDialogComponent)
		dialogRef.componentInstance.note = note;
	}

	downloadFile(file: FileModel) {
		const data = new Blob([file.content], {type: 'application/octet-stream'});
		FileSaver.saveAs(data, file.fileName);
	}

	fileChange(event) {
		if (event.target.files.length > 0) {
			const selectedFile: File = event.target.files[0];
			const data: FileModel = {
				fileName: selectedFile.name,
				fileType: selectedFile.type,
				content: new Blob([selectedFile], {type: selectedFile.type})
			}
			this.downloadFile(data);
		}
	}

	logout() {
		this.loginService.logout();
	}
}
