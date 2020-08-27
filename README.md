# Node Express api

This is a Node, Express and Mongo Db server which serves the api for my react app.

This is only a development purpose app which mimics the twitter app.

On this server, I have implemented Express api with jwt token to authenticate user. The .env file consist of SECRET_KEY which will be used to hash user's password. 

Note, the api end points are 

SIGNIN (POST)

localhost:8001/api/auth/signin

SIGNUP (POST)

localhost:8001/api/auth/signup

GET ALL MESSAGES

localhost:8001/api/messages from all users

user must loged in first to view all messages

CREATE (POST)

localhost:8001/api/user/:user_id/messages

user must loged in to create message. other user cannot create message for another user. this authentication will be done via jwt token. 

DELETE

localhost:8001/api/user/:user_idd4bccd6ed/messages/message_id

only the user who created message can delete message, 

