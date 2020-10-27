FROM node:10-alpine

#app directory
WORKDIR /server

#copy package.json
COPY package*.json ./ 

#Run npm install
RUN npm install

#copy other app contents
COPY . .

#run Prisma
RUN npx prisma generate


#make port available
EXPOSE 5000

#start app
CMD [ "npm","run","dev" ]


