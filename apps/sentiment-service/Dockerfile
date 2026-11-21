FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/sentiment-service
EXPOSE 3005
CMD ["node", "apps/sentiment-service/dist/server.js"]