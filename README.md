![](./src/image/sharemoji.png)

## 🔧 Development

```bash
$ cp .env-sample .env
```

Firebase setup introduce https://firebase.google.com/docs/web/setup

Then, edit `.env` file.

```js
FIREBASE_API_KEY="api-key"
FIREBASE_AUTH_DOMAIN="project-id.firebaseapp.com"
FIREBASE_DATABASE_URL="https://project-id.firebaseio.com"
FIREBASE_PROJECT_ID="project-id"
FIREBASE_STORAGE_BUCKET="project-id.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="sender-id"
FIREBASE_APP_ID="app-id"
FIREBASE_MEASUREMENT_ID="G-measurement-id"
```

After finish Firebase environment setting, execute this commands.

```bash
$ yarn
$ yarn dev
```

Open http://localhost:3000 to view it in the browser.
