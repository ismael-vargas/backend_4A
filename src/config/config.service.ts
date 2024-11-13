import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV || 'development';
    const envFilePath = `${process.cwd()}/.env.${env}`; 
    //console.log(`Buscando archivo de entorno en: ${envFilePath}`);
    
    const existsPath = fs.existsSync(envFilePath);
    if (!existsPath) {
      console.error(`Archivo .env.${env} no existe en la ruta: ${envFilePath}`);
      process.exit(0);
    }

    this.envConfig = parse(fs.readFileSync(envFilePath));
    //console.log(`Variables de entorno cargadas:`, this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
