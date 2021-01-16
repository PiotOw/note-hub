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
import {Router} from '@angular/router';
import {MessageComponent} from '../message/message.component';

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
				private loginService: LoginService,
				private router: Router) {
	}

	ngOnInit(): void {
		this.fetchNotes();

		this.fetchFiles();
	}

	fetchNotes() {
		this.noteService.fetchAllNotes().subscribe(res => {
			this.NOTES = res;
		});
	}

	fetchFiles() {
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
				this.noteService.postNote(newNote).subscribe(res => {
					this.fetchNotes();
				})
			}
		})
	}

	decryptNote(note: Note) {
		const dialogRef = this.dialog.open(DecryptNoteDialogComponent)
		dialogRef.componentInstance.note = note;
	}

	downloadFile(file: FileModel) {
		const data = new Blob([file.savedContent], {type: 'application/octet-stream'});
		FileSaver.saveAs(data, file.fileName);
	}

	fileChange(event) {
		if (event.target.files.length > 0) {
			// const selectedFile: File = event.target.files[0];
			// const x: Blob = new Blob([selectedFile], {type: selectedFile.type});
			// x.arrayBuffer().then(array => {
			// 	const byteArray = new Uint8Array(array);
			// 	const data: FileModel = {
			// 		fileName: selectedFile.name,
			// 		fileType: selectedFile.type,
			// 		savedContent: '[' + byteArray.toString() + ']'
			// 	};
			// 	this.fileService.uploadFile(data).subscribe(res => {
			// 		this.fetchFiles();
			// 	})
			// });
			const dialogRef = this.dialog.open(MessageComponent);
			dialogRef.componentInstance.message = 'We are sorry, but this feature couldn\'t have been pulled off in the time of app launch';
		}
	}

	logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}
}
