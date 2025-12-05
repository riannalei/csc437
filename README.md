### Steps to start app on VPS 
ssh xxx@xxx-host.csse.dev
cd ~/csc437 
git pull
npm install 
npm -w app run build
npm -w server run build
pkill -f "server/dist/index.js" || true 
nohup npm -w server run start:app > server.log 2>&1 &
