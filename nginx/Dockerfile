# Build Vue App

FROM node:20-slim AS builder

WORKDIR /app
COPY ./html/package*.json ./
RUN npm ci --only=production
COPY ./html ./
RUN npm run build

# Run Nginx

FROM nginx:alpine

RUN apk add --no-cache openssl

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080 4430

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]