#!/bin/bash
npm run kill


concurrently "npm run dev" \
 "npm run pm2 logs medical-records-client" \
 "cd ../server && ./start-server.sh" \ 
