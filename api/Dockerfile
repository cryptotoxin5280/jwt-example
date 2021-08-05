FROM alpine:3.11.3

RUN apk add npm

WORKDIR /app
COPY . /app/.

RUN npm install
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate \
  && pm2 set pm2-logrotate:retain 5 \
  && pm2 set pm2-logrotate:max_size 50M

EXPOSE 4000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

