## Установить `NODEjs` LTS версию --> https://nodejs.org/en.

# Чтобы посмотреть клиентскую часть сайта
Переходим в каталог `app` и запускаем сайт
 - cd app
 - npm start
 
# Чтобы посмотреть серверную часть сайта
Устанавливаем базу `PostgreSQL` -> https://www.postgresql.org/

 - Создаем базу внутри приложения

Переходим в каталог `server`
 - cd server


Редактируем `.env.example` -> `.env` или создаем новый файл.
```env
WEBSITEPORT="Порт нашего сайта, который может делать запросы"
PORT="Порт сервера"
DB_NAME="Название базы"
DB_USER="postgres"
DB_PASSWORD="Пароль от базы"
DB_HOST="localhost"
DB_PORT=5432
SECRET_KEY="Секретный ключ от JWT"
```

Запускаем сервер 
 - npm run dev 


