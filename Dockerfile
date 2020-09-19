FROM node:12
RUN mkdir /api
ADD . /api
WORKDIR /api
RUN npm i
EXPOSE 80
CMD ["npm", "start"]