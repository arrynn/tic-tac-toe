import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:"*", methods:['GET','OPTIONS','POST','PUT']})
  await app.listen(8901);
}
bootstrap();
