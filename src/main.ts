import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { absolute1, absolute2, absolute3 } from './mathabs/mathabs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  absolute1();
  absolute2();
  absolute3();
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });

  await app.listen(config.server.port);
}
bootstrap();
