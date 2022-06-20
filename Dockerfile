FROM node:16.15.1-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn --frozen-lockfile --prod

FROM node:16.15.1-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile

RUN yarn build

# Production image, copy all the files and run node server
FROM node:16.15.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs \
&& adduser --system --uid 1001 nodeuser \
&& chown -R nodeuser:nodejs /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/build ./build
COPY --from=deps /app/node_modules ./node_modules

USER nodeuser

CMD [ "node" , "build/server.js" ]
