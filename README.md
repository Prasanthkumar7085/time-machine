# Time Machine

## Run website locally

## 1. Install MongoDB (Mac Instructions (Catalina onwards))

If you have MongoDB installed on your os you can pass this step.

you can follow this tutorial: https://zellwk.com/blog/install-mongodb/

`brew tap mongodb/brew`

`brew install mongodb-community`

`sudo mkdir -p /System/Volumes/Data/data/db`

`` sudo chown -R `id -un` /System/Volumes/Data/data/db ``

## 2. Install and Open MongoDB Compass

If you have MongoDB installed on your os you can pass this step.

link: https://www.mongodb.com/try/download/compass

## 3. Start MongoDB

The command depends on how your os. If you are using mac os and
If you installed MongoDB based on the tutorial then you to start MongoDB:

`mongod`

## 4. Start Backend

`cd backend`

Only for the first time to install all packages.

`pnpm i`

`pnpm dev`

## 5. Start Frontend

`cd frontend`

Only for the first time to install all packages.

`pnpm i`

`pnpm start`

## 6. Sign up an admin account

1. Wait for the website to finish loading in `localhost:3000`
2. Sign up for an account
3. Open MongoDB Compass
4. Click 'Connect'
5. Choose the 'timemachine' database
6. Click 'users'
7. Set `isAdmin` to `true` for your account
8. Click 'Update'
9. Reload the website
