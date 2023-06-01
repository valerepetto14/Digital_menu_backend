CREATE USER menu_conexion_local WITH PASSWORD 'valentin';
ALTER USER menu_conexion_local CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE digital_menu TO menu_conexion_local;