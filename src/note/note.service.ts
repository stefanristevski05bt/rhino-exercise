import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteRequest } from './note-request';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) { };

  async save(noteRequest: NoteRequest) {
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

  remove(id: number) {
    return this.noteRepository.delete(id);
  }

  async getAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async getById(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id })
  }
}
