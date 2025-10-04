import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { Note } from './note.entity';
import { NoteRequest } from './note-request.dto';
import { INoteServiceToken } from './note.costants';
import type { INoteService } from './note.interface';

@Controller('note')
export class NoteController {
    constructor(
    @Inject(INoteServiceToken) private readonly noteService: INoteService,
  ) {}

  @Get(':id')
  getById(@Param('id') id: number): Promise<Note | null> {
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
