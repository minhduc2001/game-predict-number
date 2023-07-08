## Welcome to game predict number

- Idea: Building upon the traditional "tai xiu" game, players can guess the outcome of a randomly generated number, whether it is even, odd, greater than or equal to 5, or less than 5. To enhance the excitement of the game, the website incorporates virtual coins, enabling players to place bets. If they win, they receive an additional 90% of the wagered coins as winnings. However, if they lose, they forfeit the virtual coins. These virtual coins hold no value outside of the game.
- Desc: The game utilizes sockets to synchronize gameplay sessions among different players. It incorporates a timer and data processing handled on the server to provide real-time data. Additionally, secure login requirements are implemented using JWT (JSON Web Tokens) for enhanced security.
- Gameplay: Players are required to log in to the system, choose the amount of virtual coins to wager, and place their bets within the final 15 seconds. They then await the system to generate the number and analyze the outcome.

### Features

- User Registration and Login: Players can create an account and log in to access the game and their virtual coin balance.

- Virtual Coin System: The game incorporates a virtual coin system that allows players to place bets using these virtual coins. The balance of virtual coins is tracked and updated accordingly.

- Betting Options: Players can choose from various betting options, such as guessing whether the generated number will be even, odd, greater than or equal to 5, or less than 5.

- Real-time Synchronization: The game utilizes socket programming to synchronize gameplay sessions among multiple players, ensuring that everyone receives the latest updates and results in real-time.

- Countdown Timer: A countdown timer is displayed to indicate the remaining time for players to place their bets. This adds an element of excitement and urgency to the gameplay.

- Result Analysis: After the system generates the number, the game analyzes the results and determines the winners and losers based on the players' betting choices.

- Winnings Calculation: If a player wins a bet, they receive an additional 90% of the wagered coins as winnings. The virtual coin balance is updated accordingly.

- Secure Authentication: JWT (JSON Web Tokens) can be used for secure user authentication, ensuring that only authenticated players can access and participate in the game.

### Technology

- Vue 3: Vue 3 is a progressive JavaScript framework for building user interfaces. It provides a component-based architecture and reactive data binding, making it suitable for creating dynamic and interactive web applications.

- Vuex: Vuex is a state management pattern and library for Vue.js. It allows for centralized state management, making it easier to manage and share data between different components of the game.

- NestJS: NestJS is a progressive Node.js framework for building scalable and efficient server-side applications. It follows the modular architecture and uses TypeScript, making it well-suited for developing the game's server-side logic and APIs.

- WebSocket: WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. It enables real-time, bidirectional communication between the game server and the clients, facilitating synchronized gameplay sessions.

- Socket.io: Socket.io is a library that enables real-time, event-based communication between the server and clients using WebSocket or fallback options if WebSocket is not supported. It simplifies the implementation of real-time features in the game, such as real-time data synchronization and messaging.

- JWT (JSON Web Tokens): JWT is a standard for securely transmitting information between parties as JSON objects. It can be used for secure authentication and authorization in the game, ensuring that only authenticated users can access and participate in the game sessions.

## How to run?

Requirement:

- Node version >= 16
- Docker
- Recomment yarn (npm)

**How to run**

1.  _Install dependences, touch .env_
    In root project:
    > $ cd backend && yarn && cd ../client && yarn
    > or
    > $ npm install

> $ touch .env && cp .env.example .env

2.  _Init environment using docker_

Start docker (postgres, redis)

> $ docker compose up -d
> or
> $ yarn docker:up

Stop docker

> $ docker compose down
> or
> $ yarn docker:down

3.  _Run project_

Run with develop: on root project

> cd bachend && yarn start:dev
> cd client && yarn dev

Run with product: on root project

> yarn start:prod
> yarn start

Build: on folder backend or client

> yarn build

Check lint: on folder backend or client

> yarn lint

Check prettier: on folder backend or client

> yarn prettier
> or
> yarn prettier:fix #if u need fix format code.

###End
