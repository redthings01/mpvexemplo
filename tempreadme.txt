1 - Código de Autenticação é feito no [...nextauth]/route.ts, usando o prisma
para buscar no banco de dados durante o login.
    O código está usando "bcrypt.compare" para verificar a senha


2 - Como o Prisma Acessa o Banco de Dados?
O Prisma usa uma string de conexão (connection string) para se conectar ao banco de dados.
Essa string de conexão é configurada no arquivo .env do seu projeto e contém todas
as informações necessárias para acessar o banco de dados, incluindo:


executar migrações do prisma

npx prisma migrate dev --name init

npm run prisma:seed