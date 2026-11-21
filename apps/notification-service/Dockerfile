FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/notification-service
EXPOSE 3003
CMD ["node", "apps/notification-service/dist/server.js"]