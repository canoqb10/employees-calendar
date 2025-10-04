FROM nginx:1.29-alpine

ARG UID
EXPOSE $UID

RUN adduser -u ${UID} --disabled-password --gecos "" appuser
COPY default.conf /etc/nginx/conf.d/default.conf
