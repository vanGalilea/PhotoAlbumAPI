# Photo album service 📷
The Photo album service is a CRUD service connected to a postgres database.
At this moment all CRUD operations are functional beside the Update.

---

## Endpoints 📍
#### 1. GET /albums ---> Retrieve all albums 📚
In order to retrieve all albums
Response body:
```
[
    {
        "id": 1,
        "title": "My album I",
        "description": "This album is about animals",
        "createdAt": "2018-12-06T21:44:09.947Z",
        "updatedAt": "2018-12-06T21:44:09.947Z",
        "Pages": [
            {
                "id": 1,
                "photosCount": 2,
                "createdAt": "2018-12-06T21:44:09.966Z",
                "updatedAt": "2018-12-06T21:44:09.966Z",
                "AlbumId": 1,
                "Photos": [
                    {
                        "id": 2,
                        "url": "http://roflzoo.com/pics/201409/tn_bunny-is-not-impressed.jpg",
                        "createdAt": "2018-12-06T21:44:09.976Z",
                        "updatedAt": "2018-12-06T21:44:09.976Z",
                        "PageId": 1
                    }
                ]
            }
        ]
    }
    {id: 2 ....},
    {id: 3 ....}
]
```

#### 2. GET /album/:id ---> Retrieve a single album 📙
In order to retrieve a single album by id
Response body:
```
{
    "id": 1,
    "title": "My album I",
    "description": "This album is about animals",
    "createdAt": "2018-12-06T21:44:09.947Z",
    "updatedAt": "2018-12-06T21:44:09.947Z",
    "Pages": [
        {
            "id": 1,
            "photosCount": 2,
            "createdAt": "2018-12-06T21:44:09.966Z",
            "updatedAt": "2018-12-06T21:44:09.966Z",
            "AlbumId": 1,
            "Photos": [
                {
                    "id": 2,
                    "url": "http://roflzoo.com/pics/201409/tn_bunny-is-not-impressed.jpg",
                    "createdAt": "2018-12-06T21:44:09.976Z",
                    "updatedAt": "2018-12-06T21:44:09.976Z",
                    "PageId": 1
                }
            ]
        }
    ]
}
```

#### 3. GET /album/:id/html ---> View a single album  📖
In order to view a single album by id

#### 4. POST /album ---> Create a single album ✍️
In order to remove a single album by id
Request body:
```
{
    "id": 1,
    "title": "My album I",
    "description": "This album is about animals",
    "createdAt": "2018-12-06T21:44:09.947Z",
    "updatedAt": "2018-12-06T21:44:09.947Z",
    "Pages": [
        {
            "id": 1,
            "photosCount": 2,
            "createdAt": "2018-12-06T21:44:09.966Z",
            "updatedAt": "2018-12-06T21:44:09.966Z",
            "AlbumId": 1,
            "Photos": [
                {
                    "id": 2,
                    "url": "http://roflzoo.com/pics/201409/tn_bunny-is-not-impressed.jpg",
                    "createdAt": "2018-12-06T21:44:09.976Z",
                    "updatedAt": "2018-12-06T21:44:09.976Z",
                    "PageId": 1
                }
            ]
        }
    ]
}
```

#### 5. DELETE /album/:id ---> Remove single album 🗑️
In order to remove a single album by id

---

## How to's
#### Setting up a local Photo album service with Docker 📦
The easiest way to run the Photo album service locally is running it in a [Docker](https://www.docker.com/) container.  
First you need to [install Docker and Docker Compose](https://docs.docker.com/compose/install/) on your machine.

After installation, run the following command:  
`git clone git@github.com:vanGalilea/PhotoAlbumAPI.git`

`cd PhotoAlbumApi`

`sudo docker-compose up`

This will start a Photo album service instance in docker. You can check if it works by checking [http://localhost:8080/ping/](). It should say something like 'ping 💪'.

#### Setting up a local Photo album service with your database 🗄️
1. create `.env` file in the root of the project:

`git clone git@github.com:vanGalilea/PhotoAlbumAPI.git`

`cd PhotoAlbumApi`

`touch .env`

`vim .env` open the file with VIM or with any other text editor
Add the next environment variables:

```
PORT=8080 #port of the service
DATABASE_DIALECT=postgres #your data base type 'mysql'|'sqlite'|'postgres'|'mssql'
DATABASE_HOST=localhost #your data base host
DATABASE_NAME=photoalbumdb
DATABASE_USERNAME=testuser
DATABASE_PASSWORD=qwerty1 
DATABASE_PORT=5432
```

After creating the `.env` file run the following command:  

`npm install`

`npm run dev` or `npm start` 

dev will run it with [nodemon](https://nodemon.io/) which will watch your changes and restart the service automatically.

---

## Resources 🔖
[Sequelize ORM docs](http://docs.sequelizejs.com/)  
[Pug template (formerly known as "Jade")](https://pugjs.org/api/getting-started.html)  
