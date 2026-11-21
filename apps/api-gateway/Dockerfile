FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/api-gateway
EXPOSE 3000
CMD ["node", "apps/api-gateway/dist/server.js"]