
# PetMate Backend

This is the backend for a chat application built using Node.js, Express, and MongoDB with Mongoose as the ODM. It handles user authentication, chat sessions, and message storage.



## Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/chat-app-backend.git
   cd chat-app-backend
```

2.  Install dependencies:
```bash
  npm install
  ```
3. Set up environment variables: Create a .env file in the root directory and add the following:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4.  Start the server:
```bash
npm start
```

    
## API Reference 

Once the server is running, you can interact with the API using tools like Postman or cURL.

The server will be running on http://localhost:5000


### API Endpoints

#### User Endpoints
- POST /api/users/register: Register a new user.

- POST /api/users/login: Log in a user.

- UPDATE /api/users/addtoFavourite : Add pet to the its favourites

- UPDATE /api/users/removeFavourite : remove pet from the its favourites

- GET /api/users/getFavourites : Get all the favourite pets of the user

#### Pet Endpoints

- GET /api/pet/addPet : Add a new pet to the DB

- GET /api/getAllPetData : Get data of all the pets

#### Message Endpoints

- GET /api/messages/getAllMessages : Get all messages for a chat session.

- POST /api/sendmessage: Send a new message.

- GET /api/messages/getUserChat : Get the chat between two users.




## Features

- User Authentication: Secure user registration and login.
- Pet Listings: Users can add, view, and favorite pets available for adoption.
- In-App Messaging: Chat functionality between pet owners and potential adopters.


## Contributing

Contributions are always welcome!

1.  Fork the repository.
2.  Create a new branch (git checkout -b feature-branch).
3.  Make your changes.
4.  Commit your changes (git commit -m 'Add some feature').
5.  Push to the branch (git push origin feature-branch).
6.  Open a pull request.



