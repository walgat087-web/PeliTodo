# Dockerfile para Next.js 14
# Construcción multi-etapa optimizada

# Etapa 1: Dependencias
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Etapa 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependencias desde deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno para build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Instalar dependencias de desarrollo y construir
RUN npm ci && npm run build

# Etapa 3: Runner (Producción)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Copiar archivos de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando de inicio
CMD ["node", "server.js"]
