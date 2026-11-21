FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/corporate-news-service
EXPOSE 3006
CMD ["node", "apps/corporate-news-service/dist/server.js"]