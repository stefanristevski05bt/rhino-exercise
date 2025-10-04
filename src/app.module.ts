import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';
import { Note } from './note/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join('resource/i18n/'),
        watch: true,
      },
      resolvers: [QueryResolver],
    }),
    TypeOrmModule.forFeature([Note])
  ],
  controllers: [AppController, NoteController],
  providers: [AppService, NoteService],
})
export class AppModule { }
