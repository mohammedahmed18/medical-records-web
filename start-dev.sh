#!/bin/bash

cd ../server

docker-compose up -d 

npx prisma generate
npx prisma migrate dev
pnpm pm2 delete all
pnpm run dev:old

concurrently "cd ../client && yarn dev" "pnpm pm2 logs medical-records-server" 
