import {Injectable} from '@angular/core';
import {Note} from './note.model';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FileModel} from '../file/file.model';
import {NoteTypeEnum} from './note-type.enum';

@Injectable({
	providedIn: 'root'
})
export class NoteService {
// TODO
	NOTES: Note[] = [
		{
			title: 'Note title',
			content: '6b9245da6f0e1c907d917c9dfb2400afc1e5f701a1e5b522b2a3d374ac94bc36d66d8b0cd14dab6753eea9200468ec74402567c52a5da46a',
			type: NoteTypeEnum.PROTECTED
		}
	]

	constructor(private http: HttpClient) {
	}

	fetchAllNotes(): Observable<Note[]> {
		const link = environment.BASE_API_URL + '/notes';
		// return this.http.get<any>(link);
		return of(this.NOTES)
	}

	postNote(data: Note): Observable<any> {
		const link = environment.BASE_API_URL + '/notes';
		return this.http.post<any>(link, data);
	}
}
