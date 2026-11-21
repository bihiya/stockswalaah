FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/auth-service
EXPOSE 3001
CMD ["node", "apps/auth-service/dist/server.js"]