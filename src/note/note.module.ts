import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { INoteServiceToken } from './note.costants';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [
    {
      provide: INoteServiceToken,
      useClass: NoteService,
    },
  ],
})
export class NoteModule {}