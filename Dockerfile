FROM nginx:alpine

LABEL maintainer="Brian Van Bellinghen <van.bellinghen.brian@gmail.com>"

# Copy static files
COPY . /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
