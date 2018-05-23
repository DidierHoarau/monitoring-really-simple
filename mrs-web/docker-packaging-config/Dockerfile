FROM nginx:latest

RUN rm -fr /etc/nginx/site-enabled/default.conf
RUN rm -fr /etc/nginx/conf.d/default.conf

COPY files/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/site-enabled/
COPY docker/nginx/default.conf /etc/nginx/conf.d/
