import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteRequest } from './note-request.dto';
import { DeleteResult } from 'typeorm/browser';

describe('NoteService', () => {
  let service: NoteService;
  let repo: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: getRepositoryToken(Note),
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    repo = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of notes', async () => {
      const notes = [{ id: 1 } as Note];
      jest.spyOn(repo, 'find').mockResolvedValue(notes);
      expect(await service.getAll()).toEqual(notes);
    });
  });

  describe('getById', () => {
    it('should return a note by id', async () => {
      const note = { id: 1 } as Note;
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(note);
      expect(await service.getById(1)).toEqual(note);
    });
  });

  describe('save', () => {
    it('should create and save a new note if id is not provided', async () => {
      const noteRequest = { title: 'Test' } as NoteRequest;
      const createdNote = { ...noteRequest, date: expect.any(String) } as Note;
      jest.spyOn(repo, 'create').mockReturnValue(createdNote);
      jest.spyOn(repo, 'save').mockResolvedValue(createdNote);
      expect(await service.save(noteRequest)).toEqual(createdNote);
    });

    it('should update and save an existing note if id is provided', async () => {
      const noteRequest = { id: 1, title: 'Updated' } as NoteRequest;
      const existingNote = { id: 1, title: 'Old' } as Note;
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(existingNote);
      jest.spyOn(repo, 'save').mockResolvedValue({ ...existingNote, ...noteRequest });
      expect(await service.save(noteRequest)).toEqual({ ...existingNote, ...noteRequest });
    });
  });

  describe('remove', () => {
    it('should delete a note by id', async () => {
      const result = { affected: 1 } as DeleteResult;
      jest.spyOn(repo, 'delete').mockResolvedValue(result);
      expect(await service.remove(1)).toEqual(result);
    });
  });
});
