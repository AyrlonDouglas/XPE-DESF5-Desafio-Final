# Multi-stage build para alta performance
FROM node:22.18.0-alpine AS base

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Stage de dependências - cache otimizado
FROM base AS deps
# Instalar dependências de produção e desenvolvimento
RUN npm ci --only=production && npm cache clean --force

# Stage de build - compilação TypeScript
FROM base AS builder
# Instalar todas as dependências para build
RUN npm ci
# Copiar código fonte
COPY . .
# Build da aplicação
RUN npm run build

# Stage de produção - imagem final otimizada
FROM node:22.18.0-alpine AS runner

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Configurar diretório de trabalho
WORKDIR /app

# Copiar dependências de produção
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copiar código compilado
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Expor porta
EXPOSE 3000

# Mudar para usuário não-root
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Comando de inicialização otimizado
CMD ["node", "dist/src/main.js"]
