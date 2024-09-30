# Budget Tracker App with Firebase, Auth0, and React

# Note

1. Temporarily Allow Unauthenticated Access (For Testing Only)

In firebase console, go to `Firestore Database` -> `Rules` and replace the content with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for testing
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

```

## 1. Introduction
