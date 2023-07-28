FROM node:18

# Create app directory
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g typescript
RUN tsc
EXPOSE 3000

ENV NODE_ENV="production"
ENV POPULATE_DB="false" 
ENV PORT=3000
ENV DB_PORT=5432
ENV DB_HOST="localhost"
ENV DB_NAME="digital_menu"
ENV DB_USERNAME="valentin"
ENV DB_PASSWORD="valentin"
ENV TOKEN_SIGN="anashe"

CMD [ "node", "dist/src/index.js" ]
