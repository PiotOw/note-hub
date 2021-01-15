import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {NoteTypeEnum} from '../../note/note-type.enum';

@Component({
	selector: 'app-add-note-dialog',
	templateUrl: './add-note-dialog.component.html',
	styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent implements OnInit {

	NoteTypeEnum = NoteTypeEnum;

	TYPES = [
		NoteTypeEnum.PRIVATE,
		NoteTypeEnum.PROTECTED,
		NoteTypeEnum.PUBLIC
	]

	noteType: NoteTypeEnum = NoteTypeEnum.PRIVATE;

	notePasswordForm = new FormGroup({
		password: new FormControl(null, Validators.required)
	})

	noteForm = new FormGroup({
		title: new FormControl(null, Validators.required),
		content: new FormControl(null, Validators.required),
	})

	constructor(private dialogRef: MatDialogRef<AddNoteDialogComponent>) {
	}

	ngOnInit(): void {
	}

	addNote() {
		if (this.noteForm.valid && (this.noteType != NoteTypeEnum.PROTECTED || (this.notePasswordForm.valid))) {
			let newNote = {
				title: this.noteForm.controls['title'].value,
				content: this.noteForm.controls['content'].value,
				noteType: this.noteType,
				password: this.notePasswordForm.controls['password'].value
			}
			this.dialogRef.close(newNote);
		} else {
			this.noteForm.markAllAsTouched();
			this.notePasswordForm.markAllAsTouched();
		}
	}

	close() {
		this.dialogRef.close()
	}
}
