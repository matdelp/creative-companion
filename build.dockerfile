FROM node:22-slim as BUILD

# TODO: improve build
WORKDIR /make
COPY . .

RUN yarn install
RUN yarn workspace @creative-companion/frontend run build
RUN yarn workspace @creative-companion/backend run build


FROM node:22-slim as DEPENDENCIES

RUN yarn install --production

FROM node:22-slim


WORKDIR /app
RUN apt-get update && \
    apt-get install -y libssl3 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# COPY engine binary where prisma can find it : https://pris.ly/engine-not-found-bundler-investigation
COPY --from=BUILD /make/node_modules/.prisma/client/libquery_engine* .
COPY --from=DEPENDENCIES node_modules node_modules
COPY --from=BUILD /make/apps/backend/dist dist
COPY --from=BUILD /make/apps/frontend/dist build
EXPOSE 5000
CMD ["node","dist/index.js"]