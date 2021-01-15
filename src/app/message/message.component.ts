import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

	showSpinner: boolean = false;

	message: string;

	constructor(private dialogRef: MatDialogRef<MessageComponent>) {
	}

	ngOnInit() {
	}

	close() {
		this.dialogRef.close();
	}

}

