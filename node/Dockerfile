# build---
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

#runtime---
FROM node:20-alpine AS runner

WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

COPY --from=deps /app/js/index.js ./index.js
COPY --from=deps /app/js/db.js ./db.js
COPY --from=deps /app/js/initdb.js ./initdb.js

COPY --from=deps /app/js/models/User.js ./models/User.js

COPY --from=deps /app/js/routes/registerRoute.js ./routes/registerRoute.js
COPY --from=deps /app/js/routes/loginRoute.js ./routes/loginRoute.js
COPY --from=deps /app/js/routes/matchmakingRoute.js ./routes/matchmakingRoute.js
COPY --from=deps /app/js/routes/meRoute.js ./routes/meRoute.js
COPY --from=deps /app/js/routes/logoutRoute.js ./routes/logoutRoute.js

RUN mkdir -p /app/certs && chown -R node:node /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER node
ENV PORT=8787
EXPOSE 8787

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "index.js"]