import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteRequest } from './note-request.dto';
import { I18nContext } from 'nestjs-i18n';
import { INoteService } from './note.interface';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class NoteService implements INoteService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) { };

  async save(noteRequest: NoteRequest): Promise<Note> {
    let note: Note | null;
    if (noteRequest.id) {
      note = await this.noteRepository.findOneBy({ id: noteRequest.id })

      if (!note) {
        throw new Error(I18nContext.current()?.t('note.not_found', { args: {id: noteRequest.id}}));
      }
      Object.assign(note, noteRequest);
    }
    else {
      note = this.noteRepository.create({
        ...noteRequest,
        date: new Date().toDateString()
      })
    }

    return this.noteRepository.save(note);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.noteRepository.delete(id);
  }

  async getAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async getById(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id })
  }
}
