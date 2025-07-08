echo "Rodando migrations..."

npx prisma migrate deploy
npx prisma generate

echo "Migrations aplicadas com sucesso!"