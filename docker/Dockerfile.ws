FROM oven/bun:1

WORKDIR /app

COPY ./package.json ./bun.lock ./turbo.json ./
COPY ./apps/websocket/package.json ./apps/websocket/
COPY ./packages/db/package.json ./packages/db/

RUN bun install

COPY ./packages/db ./packages/db
COPY ./apps/websocket ./apps/websocket

RUN bun db:generate

EXPOSE 8081

CMD ["bun", "run", "start:websocket"]