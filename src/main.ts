import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';

const port: string | number = process.env.PORT_SERVER;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true });
  await app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`)
  });
}
bootstrap();