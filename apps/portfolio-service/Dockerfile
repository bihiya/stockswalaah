FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/portfolio-service
EXPOSE 3002
CMD ["node", "apps/portfolio-service/dist/server.js"]