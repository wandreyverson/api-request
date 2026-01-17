#!/bin/bash

echo "🚀 Iniciando SQL Server..."
/opt/mssql/bin/sqlservr &

echo "⏳ Aguardando SQL Server iniciar..."
sleep 20

echo "📦 Executando init.sql..."
/opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U SA \
  -P "$SA_PASSWORD" \
  -v DB_NAME="$DB_DATABASE" \
  -i /init-db/init.sql

echo "✅ Banco e tabelas prontos!"
wait
