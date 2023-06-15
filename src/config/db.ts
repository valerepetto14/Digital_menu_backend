class DB {
  public host: string;
  public port: number;
  public username: string;
  public password: string;
  public database: string;

  constructor() {
    // Asigna valores predeterminados o realiza otras tareas de inicialización
    this.host = '';
    this.port = 0;
    this.username = '';
    this.password = '';
    this.database = '';
  }

  setVariables(){
    this.host = process.env.DB_HOST || '';
    this.port = Number(process.env.DB_PORT) || 0;
    this.username = process.env.DB_USERNAME || '';
    this.password = process.env.DB_PASSWORD || '';
    this.database = process.env.DB_NAME || '';
  }

}

export default DB;

