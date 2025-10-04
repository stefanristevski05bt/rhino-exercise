import { Note } from './note.entity';
import { NoteRequest } from './note-request.dto';
import { DeleteResult } from 'typeorm';

export interface INoteService {
  getById(id: number): Promise<Note | null>;
  getAll(): Promise<Note[] | null>;
  save(noteRequest: NoteRequest): Promise<Note>;
  remove(id: number): Promise<DeleteResult>;
}