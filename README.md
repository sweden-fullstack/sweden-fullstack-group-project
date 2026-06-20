# Zona - the central hub for your dormitory

Zona is a web application designed to simplify life in student dormitories. It provides a centralized platform where students can stay informed, organize shared responsibilities, and participate in community events.

The application enables landlords and students to communicate efficiently while fostering a stronger dormitory community.

## Features

🔐 Google Authentication - Secure sign-in using your Google account.
📢 House Rules & Announcements - Access important dormitory information and updates.
🧹 Cleaning Schedule - Organize and track shared cleaning responsibilities.
🏠 Section Hub - View residents, upcoming gatherings, and shared calendars.
👤 Resident Profiles - Manage room details, contact information, and account settings.
🛠️ Admin Dashboard – Manage residents, sections, and administrative roles.

## Basic structure

```
root
|
+-- backend         # API, database logic, authentication
|
+-- frontend        # React frontend application
|
+-- shared          # Shared types
```

## Getting started

### Prerequisites

- [mysql](mysql.com)
- [node](https://nodejs.org/en/download)
- [docker](https://docs.docker.com/engine/install/) (if running using docker)

### Setup

1. Git clone the project

```bash
git clone https://github.com/sweden-fullstack/sweden-fullstack-group-project.git
```

2. Setup `.env` - you can use [.env.example](./.env.example),

#### Local (Recommended)

1. Install dependencies

```bash
npm ci
```

2. Start the project

```bash
npm run dev
```

#### Docker

1. Build the docker containers and start the project

```
docker compose up
```

#### Optional

- You can run `npm run seed -w backend` to seed the database, you must sign-in before being able to use the app.

## Info

Some more info can be found here

[Frontend README](/frontend/README.md)
[Backend README](/backend/README.md)
[Shared README](../shared/README.md)
