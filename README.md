# Stream Deck

A web-based stream deck that turns any phone or tablet into a remote control for your PC. Open the client page on your mobile device and control music playback, Discord, and browser actions over your local network.

## How It Works

- **Client** -- A single HTML page served to your phone/tablet. Buttons send HTTP requests to the server.
- **Server** -- A Node.js + Express API running on your PC. It receives commands and simulates keyboard shortcuts using [RobotJS](https://robotjs.io/).

### Features

| Section  | Action         | What it does                          |
|----------|----------------|---------------------------------------|
| Music    | Play / Pause   | Simulates the media play/pause key    |
| Music    | Next           | Simulates the media next track key    |
| Music    | Previous       | Simulates the media previous track key|
| Music    | Volume Up      | Simulates the volume up key           |
| Music    | Volume Down    | Simulates the volume down key         |
| Discord  | Mute           | Sends `Ctrl+M` (Discord toggle mute)  |
| Browser  | Open           | Opens a new Chrome window             |

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Windows (RobotJS simulates Windows key events; the Chrome open command uses `start chrome`)
- A phone/tablet on the **same local network** as your PC

### RobotJS build requirements

RobotJS is a native module and needs a C++ build toolchain to install. On Windows, run:

```
npm install -g windows-build-tools
```

Or install the "Desktop development with C++" workload via Visual Studio Installer.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/stream-deck.git
cd stream-deck
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Configure the client IP address

Open `client/index.html` and change the `API` constant to your PC's local IP address:

```js
const API = "http://<YOUR_PC_IP>:5005";
```

To find your local IP on Windows, run `ipconfig` and look for the IPv4 address (usually starts with `192.168.`).

### 4. Start the server

```bash
cd server
npm run dev
```

The server starts on **port 5005**. You should see:

```
Server is running on port 5005
```

> `npm run dev` uses [nodemon](https://nodemon.io/) for auto-restart on file changes. Install it globally with `npm install -g nodemon`, or use `node server.js` instead.

### 5. Open the client on your phone

Serve the `client/index.html` file to your phone. A few options:

- **Simple HTTP server** -- from the project root, run:
  ```bash
  npx serve client
  ```
  Then open `http://<YOUR_PC_IP>:3000` on your phone's browser.

- **Direct file** -- copy `client/index.html` to your phone and open it in a browser.

- **Any static file server** -- point it at the `client/` folder.

## Project Structure

```
stream-deck/
├── client/
│   └── index.html              # Mobile-friendly UI (single file, no build step)
├── server/
│   ├── controller/
│   │   ├── musicPlayerController.js   # Media key simulation
│   │   ├── discordController.js       # Discord mute (Ctrl+M)
│   │   └── chromeController.js        # Open Chrome window
│   ├── routes/
│   │   ├── musicPlayerRouter.js
│   │   ├── discordRouter.js
│   │   └── chromeRouter.js
│   ├── server.js               # Express app entry point
│   └── package.json
└── README.md
```

## API Endpoints

All endpoints accept `POST` requests.

| Endpoint              | Body                          | Description              |
|-----------------------|-------------------------------|--------------------------|
| `/music/musicHandler` | `{ "action": "PLAY" }`        | Play or pause media      |
| `/music/musicHandler` | `{ "action": "NEXT" }`        | Next track               |
| `/music/musicHandler` | `{ "action": "PREVIOUS" }`    | Previous track           |
| `/music/musicHandler` | `{ "action": "VOL_UP" }`      | Volume up                |
| `/music/musicHandler` | `{ "action": "VOL_DOWN" }`    | Volume down              |
| `/discord/mute`       | --                            | Toggle Discord mute      |
| `/browser/open`       | --                            | Open a new Chrome window |

## Adding New Buttons

1. Create a controller in `server/controller/` with your logic.
2. Create a route in `server/routes/` and wire up the controller.
3. Register the route in `server/server.js` with `app.use()`.
4. Add a `<button>` to `client/index.html` that calls your new endpoint.

## Troubleshooting

- **Connection refused on phone** -- Make sure your PC firewall allows incoming connections on port 5005. Also verify both devices are on the same Wi-Fi network.
- **RobotJS install fails** -- You need C++ build tools. See [RobotJS prerequisites](https://robotjs.io/docs/building).
- **Media keys don't work** -- Make sure a media player (Spotify, browser, etc.) is running and has focus for media key events.
- **Discord mute not working** -- Discord must be the focused window, or you need to set Discord's keybind to a global shortcut.

## License

ISC
