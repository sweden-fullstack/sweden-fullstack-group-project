# Frontend

## Features

### [Chakra UI](https://chakra-ui.com/docs/components/concepts/overview)

- Pre-made UI components, feel free to use html/css if you prefer but talk with
  the other frontend devs first!
- There are some example of component usage in the project

### [Axios](https://axios-http.com/docs/example)

- Sending requests with fetch has lots of boilerplate and is error prone so
  this simplifies it

### [Lucide](https://lucide.dev/icons/)

- Library which contains icons so the icons in the app are consistent and it's
  easy to find icons

### [React](https://react.dev/)

- My arch nemesis

### [Zustand](https://zustand.docs.pmnd.rs/learn/guides/beginner-typescript)

- State management library, belongs in the stores folder and must be in specific
  format, check the stores in the project for example
- If used correctly will allow us to cache the data I.E avoid re-fetching data
  from the backend, try to increase the counter and navigate with the button
  under it and back to see what I mean, one is with zustand the other with useState

## How to use?

```
src
|
+-- api               # exported API requests
|
+-- app               # application layer containing:
|   |
|   +-- router.tsx    # application router configuration
|
+-- assets            # contains the static files images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

```
src/features/feature
|
+-- api         # exported API requests related to a specific feature
|
+-- assets      # static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

[Shared README](../shared/README.md)
