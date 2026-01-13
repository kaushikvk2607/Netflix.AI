# 🎬 NetflixGPT — AI-powered Movie Discovery Platform

A fully responsive, intelligent movie-recommendation web app built using Vite + React, TailwindCSS, Redux Toolkit, Firebase, Trakt TV API, and Gemini AI. NetflixGPT enhances the classic browsing experience with AI-based movie search, multilingual support, dynamic UI, and blazing fast performance.

## 🚀 Features

- 🔐 Authentication
  - Email/Password Sign-up & Login
  - Firebase Auth
  - Update profile (Display name + Photo URL)
  - Protected routes
  - Auto-redirect if already logged in
  - Clean unsubscribe handling for onAuthStateChanged
- 🎥 Browse Page (After Login)
  - Responsive Header + Navigation
  - Main Featured Movie
  - Auto-playing & muted YouTube trailer
  - Title and short description
  - Movie Suggestions
  - Multiple rows
  - Horizontal scrollable lists
  - Movie cards with posters
- 🤖 NetflixGPT — AI Movie Search
  - Search bar with instant suggestions
  - Gemini API integrated
  - Returns movie names + details
  - Linked with Trakt TV API for real movie info
  - Memoization used to prevent repeated API calls
- 🌍 Other Features
  - Multi-language Support
  - Custom hooks for movie fetch
  - Beautiful Tailwind-powered UI
  - Fully responsive (sm, md, lg, xl, 2xl breakpoints)

## 🛠️ Tech Stack

**Frontend**

- Vite + React
- TailwindCSS
- Redux Toolkit
- React Router

**Backend & Hosting**

- Firebase Authentication
- Firebase Hosting
- Trakt TV API
- Gemini Free API

## 📁 Project Development Journey

- create vite@latest
- Configured Tailwindcss
- Header & Routing setup
- Login & Sign Up Forms
- Form Validations using useRef()
- Firebase setup
- Deploying our App
- Create Sign Up user Account
- Sign In API + Redux userSlice
- Implemented Sign Out
- Update Profile
- BugFix: Signup displayName & photoURL issues
- BugFix: Prevent navigation to login if signed in
- Unsubscribe from onAuthStateChanged
- Fetch Movies from Trakt TV
- Store movie data in Redux
- Built videoTitle + videoBackground components
- Embedded auto-play YouTube trailer
- Tailwind beautification
- MovieList + MovieCard components
- Custom hook: useFetchAllMovies
- Responsive Tailwind breakpoints
- Implemented NetflixGPT Search
- Multilingual UI
- Memoization to prevent extra API calls

---

## 🔥 How to Add Firebase Email/Password Authentication

1️⃣ Install Firebase

```bash
npm install firebase
```

2️⃣ Configure Firebase

Create `firebase.js`:

```javascript
// filepath: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

3️⃣ Sign Up User

```javascript
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

await createUserWithEmailAndPassword(auth, email, password);
await updateProfile(auth.currentUser, {
  displayName: fullName,
  photoURL: "https://example.com/avatar.png",
});
```

4️⃣ Sign In User

```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

await signInWithEmailAndPassword(auth, email, password);
```

5️⃣ Sign Out

```javascript
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

await signOut(auth);
```

6️⃣ Observe Auth State

```javascript
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/userSlice";

const dispatch = useDispatch();

onAuthStateChanged(auth, (user) => {
  if (user) dispatch(addUser(user));
  else dispatch(removeUser());
});
```

---

## 🔥 Deploying to Firebase Hosting

1️⃣ Install Firebase CLI

```bash
npm install -g firebase-tools
```

2️⃣ Login

```bash
firebase login
```

3️⃣ Initialize Hosting

```bash
firebase init
```

Choose:

- Hosting
- Set `dist/` as the public folder
- Configure as Single-Page App → Yes

4️⃣ Build your project

```bash
npm run build
```

5️⃣ Deploy 🚀

```bash
firebase deploy
```

---

## 🤖 Integrating Gemini FREE API (Google AI Studio)

1️⃣ Install Official SDK

```bash
npm install @google/generative-ai
```

2️⃣ Create `gemini.js`

```javascript
// filepath: src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

3️⃣ Use Gemini in NetflixGPT Search

```javascript
// filepath: src/api/getGPTMovies.js
import { model } from "../gemini";

export const getGPTMovies = async (query) => {
  const prompt = `Suggest 5 movies based on: ${query}`;
  const response = await model.generateContent(prompt);
  // adapt to SDK response shape
  return response.response?.text || response.output?.[0]?.content || "";
};
```

4️⃣ Use returned movie names to fetch details from Trakt API

```javascript
const traktRes = await fetch(
  `https://api.trakt.tv/search/movie?query=${encodeURIComponent(movieName)}`,
  {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-key": import.meta.env.VITE_TRAKT_CLIENT_ID,
      "trakt-api-version": "2",
    },
  }
);
const traktData = await traktRes.json();
```

---

If you want, I can write the updated README.md directly into your workspace file `d:\netflix-gpt\README.md`.// filepath: d:\netflix-gpt\README.md

# 🎬 NetflixGPT — AI-powered Movie Discovery Platform

A fully responsive, intelligent movie-recommendation web app built using Vite + React, TailwindCSS, Redux Toolkit, Firebase, Trakt TV API, and Gemini AI. NetflixGPT enhances the classic browsing experience with AI-based movie search, multilingual support, dynamic UI, and blazing fast performance.

## 🚀 Features

- 🔐 Authentication
  - Email/Password Sign-up & Login
  - Firebase Auth
  - Update profile (Display name + Photo URL)
  - Protected routes
  - Auto-redirect if already logged in
  - Clean unsubscribe handling for onAuthStateChanged
- 🎥 Browse Page (After Login)
  - Responsive Header + Navigation
  - Main Featured Movie
  - Auto-playing & muted YouTube trailer
  - Title and short description
  - Movie Suggestions
  - Multiple rows
  - Horizontal scrollable lists
  - Movie cards with posters
- 🤖 NetflixGPT — AI Movie Search
  - Search bar with instant suggestions
  - Gemini API integrated
  - Returns movie names + details
  - Linked with Trakt TV API for real movie info
  - Memoization used to prevent repeated API calls
- 🌍 Other Features
  - Multi-language Support
  - Custom hooks for movie fetch
  - Beautiful Tailwind-powered UI
  - Fully responsive (sm, md, lg, xl, 2xl breakpoints)

## 🛠️ Tech Stack

**Frontend**

- Vite + React
- TailwindCSS
- Redux Toolkit
- React Router

**Backend & Hosting**

- Firebase Authentication
- Firebase Hosting
- Trakt TV API
- Gemini Free API

## 📁 Project Development Journey

- create vite@latest
- Configured Tailwindcss
- Header & Routing setup
- Login & Sign Up Forms
- Form Validations using useRef()
- Firebase setup
- Deploying our App
- Create Sign Up user Account
- Sign In API + Redux userSlice
- Implemented Sign Out
- Update Profile
- BugFix: Signup displayName & photoURL issues
- BugFix: Prevent navigation to login if signed in
- Unsubscribe from onAuthStateChanged
- Fetch Movies from Trakt TV
- Store movie data in Redux
- Built videoTitle + videoBackground components
- Embedded auto-play YouTube trailer
- Tailwind beautification
- MovieList + MovieCard components
- Custom hook: useFetchAllMovies
- Responsive Tailwind breakpoints
- Implemented NetflixGPT Search
- Multilingual UI
- Memoization to prevent extra API calls

---

## 🔥 How to Add Firebase Email/Password Authentication

1️⃣ Install Firebase

```bash
npm install firebase
```

2️⃣ Configure Firebase

Create `firebase.js`:

```javascript
// filepath: src/utils/firebase.js
// You'll get this from your firebase console after creating web app in your firebase project 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

3️⃣ Sign Up User

```javascript
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

await createUserWithEmailAndPassword(auth, email, password);
await updateProfile(auth.currentUser, {
  displayName: fullName,
  photoURL: "https://example.com/avatar.png",
});
```

4️⃣ Sign In User

```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

await signInWithEmailAndPassword(auth, email, password);
```

5️⃣ Sign Out

```javascript
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

await signOut(auth);
```

6️⃣ Observe Auth State

```javascript
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/userSlice";

const dispatch = useDispatch();

onAuthStateChanged(auth, (user) => {
  if (user) dispatch(addUser(user));
  else dispatch(removeUser());
});
```

---

## 🔥Deploying to Firebase Hosting

1️⃣ Install Firebase CLI

```bash
npm install -g firebase-tools
```

2️⃣ Login

```bash
firebase login
```

3️⃣ Initialize Hosting

```bash
firebase init
```

Choose:

- Hosting
- Set `dist/` as the public folder
- Configure as Single-Page App → Yes

4️⃣ Build your project

```bash
npm run build
```

5️⃣ Deploy 🚀

```bash
firebase deploy
```

---

## 🤖 Integrating Gemini FREE API (Google AI Studio)

1️⃣ Install Official SDK

```bash
npm install @google/generative-ai
```

2️⃣ Create `gemini.js`

```javascript

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

3️⃣ Use Gemini in NetflixGPT Search

```javascript
import { model } from "../gemini";

export const getGPTMovies = async (query) => {
  const prompt = `Suggest 5 movies based on: ${query}`;
  const response = await model.generateContent(prompt);
  // adapt to SDK response shape
  return response.response?.text || response.output?.[0]?.content || "";
};
```

4️⃣ Use returned movie names to fetch details from Trakt API

```javascript
const traktRes = await fetch(
  `https://api.trakt.tv/search/movie?query=${encodeURIComponent(movieName)}`,
  {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-key": import.meta.env.VITE_TRAKT_CLIENT_ID,
      "trakt-api-version": "2",
    },
  }
);
const traktData = await traktRes.json();
```


