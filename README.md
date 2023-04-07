#### Использующийся дизайн -> https://dribbble.com/shots/18960146-Main-page-for-the-furniture-store


#### Установить `NODEjs` LTS версию --> https://nodejs.org/en.

# Чтобы посмотреть клиентскую часть сайта
Переходим в каталог `app` и запускаем сайт
 - cd app
 - npm i
 - npm start
 
# Чтобы посмотреть серверную часть сайта
Устанавливаем `docker` -> https://www.docker.com/

Открываем приложение `docker`

Переходим в каталог `server`
 - cd server

Включаем базу командой `docker-compose up --build`


Редактируем `.env.example` -> `.env` или создаем новый файл.
```env
WEBSITEPORT="Порт нашего сайта, который может делать запросы"
SERVER_PORT="Порт сервера"

DB_NAME="db_styliaOnline"
DB_USER="root"
DB_PASSWORD="i5fz%4Nz&o*b#1Ep"
DB_HOST="localhost"
DB_PORT=5438
```

Запускаем сервер
 - npm i
 - npm run dev 


# Документация по проекту 
### Frontend
Проект создан на библиотеке <a href="">`React`</a> 
Хуки:
    - <b>Хуки, это инструменты позволяющие делать опредленные действия</b>
    - `useNavigate` - Позволяет переместить пользователя на другую страницу внутри `react-router-dom`
Дополнительные библиотеки: 
 - <a href="">`React-router-dom`</a> - Маршрутизатор, позволяющий сайту перемещаться по страницам
### Backend