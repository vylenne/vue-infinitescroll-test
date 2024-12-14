FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

COPY dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
