import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { NoteRequest } from './note-request';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':id')
  getById(id: number): Promise<Note | null> {
    return this.noteService.getById(id);
  }

  @Get()
  getAll(): Promise<Note[] | null> {
    return this.noteService.getAll();
  }

  @Post()
  save(@Body() noteRequest: NoteRequest): Promise<Note> {
    return this.noteService.save(noteRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.noteService.remove(id);
  }
}
