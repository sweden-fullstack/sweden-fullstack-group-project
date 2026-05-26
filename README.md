# Zona - the central hub for your dormitory

Zona is an application for a student dorm. It is a central hub where students can access all the information they need. Central features are the announcement page where the landlord can post announcements and communicate with the students. Furthermore, there is the possibility of creating your digital cleaning schedule. There is also a section page where you can publish other events like a party or a section dinner. Finally there is also your profile page where you can see all the necessary data about you and of course you can also edit this data.

## Basic structure

```
root
|
+-- backend         # Contains the backend stuff
|
+-- frontend        # Contains the frontend stuff
|
+-- shared          # Contains code used in both frontend and backend
```

## Some info

- Some folders contain `README.md` file which contains explanation and example
  usage of the folders inside it
- Work on a single feature, when you are finished with that push the changes
  and work on something else, if you want to work on multiple features create
  different branches, I am pretty sure this was requirement from the teacher
  but correct me if I am wrong
- Follow [Conventional Commits](https://www.conventionalcommits.org)
  From what I remember the teacher required and it takes like 5 minutes to
  learn it!

[Frontend README](/frontend/README.md)
[Backend README](/backend/README.md)
[CONTRIBUTING.md](./CONTRIBUTING.md)

## Getting started

- Go to the [github page of the project](https://github.com/d-najd/sweden-fullstack-group-project)
- Create a fork as shown in the image below
  ![Fork image](./images/fork.png)
- Clone the repo using `git clone https://github.com/your-username/your-fork.git`
- Install [mysql](mysql.com)
- Setup `.env` - you can use [.env.example](./.env.example), if not setup the
  values of [.env.example](./.env.example)
  have been set but I doubt you have the database and user as defined there
- Setup the [mysql](https://mysql.com) database with the settings from the
  `.env` file
- Run `npm ci` to install dependencies
- Go to the backend folder and run `npm run seed`
- Run `npm run dev` to run both frontend and backend or `npm run dev:frontend` just
  for frontend or `npm run dev:backend`, you can see the other available commands
  in `package.json`
