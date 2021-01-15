import {NoteTypeEnum} from './note-type.enum';

export interface Note {
	title: string;
	content: string;
	type: NoteTypeEnum;
}
