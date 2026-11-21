FROM node:20-alpine
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN npm ci && npm run build --workspace=@stockwallah/audit-service
EXPOSE 3004
CMD ["node", "apps/audit-service/dist/server.js"]