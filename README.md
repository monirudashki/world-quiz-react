SPA World quiz games - React JS

Може да се стартира като свалите репото , инсталирате package.json на рест-сервиза с npm install и стартиране с npm start. В главната папка инсталирате package.json с npm install и се стартира с npm start. Нужно ви е и MongoDB за база данни.

Приложението е проектирано с React , за rest-api съм използвал Node.js-Express.js за база данни MongoDB.

App build - React hooks , Context Provider , React-Redux , Redux-toolkit , Google Drive AuthO
Rest-api - Node.js , Express.js , JWT , mongoose

Upload image with Google Drive Auth

- Sending file on front-end with formData , creating and uploading file on Back-end,
  then send back data to my application to render image for user

App ensure - 400~ Unit tests with Jest and react-testing-library
*Mock providers
*Mock service functions
*Mock redux state management
*Mock axios functions

Structure

Core

- Header - Dynamic Navigation
- footer
- Home Page
- 404 - Page-Not-found

Contexts

- AuthContext - users actions

+Store

- gameStore - state management for both games

Guards

- UsersOnlyGuard
- AdminOnlyGuard
- GuestsOnlyGuard

Admin Panel (lazy loaded for optimization)

- Admin Capitals Questions Catalog (with pagination and search)
- Admin Flags Question Catalog (with pagination and search)
- Admin Add Question (dynamic validation and error handling)
- Admin Edit Question (correct data for change in input fields,dynamic validation and error handling)
- Admin Delete Question

Auth

- Register (dynamic validation , error handling , login user after correct request, upload image with google drive)
- Login (dynamic validation , error handling)
- User Profile (Image , User info/User edit info, Level , Graph for last five games with correct data)

Info

- Rules (games rules with pictures)
- Scoreboard (Users with result - pagination)

Feature

- Game Capitals / Game Flags
  25 questions , timer for every question 60 seconds , question title , for possible answers
  3 Jokers (50/50 , Public Joker , Call Friend)
- Result (after each game , player see result of his game)

Shared

- Timer
- Coins And Lives
  After game players earning coins , they depend on score of current game
  every player have 5 initial lives , every game cost one live ,
  in user profile, each player can return one live , after watch commercial
- React Spinner (every time current page is in a loading position)

Services and Utils
