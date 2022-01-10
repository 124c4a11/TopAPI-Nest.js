import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export async function getMongoConfig(
  configService: ConfigService,
): Promise<TypegooseModuleOptions> {
  return {
    uri: getMongoUri(configService),
  };
}

function getMongoUri(configService: ConfigService) {
  return (
    'mongodb://' +
    // configService.get('MONGO_LOGIN') +
    // ':' +
    // configService.get('MONGO_PASSWORD') +
    // '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') // +
    // '/' +
    // configService.get('MONTO_AUTH_DB')
  );
}
