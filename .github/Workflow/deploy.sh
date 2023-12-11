export PATH= $PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

cd course_app
git pull myapp master
cd server/dist
pm2 kill
pm2 start index.js