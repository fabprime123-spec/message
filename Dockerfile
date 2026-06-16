# Monolith: Vite frontend + Express API. Build from repo root.

# --- Stage 1: build the SPA (Vite) ---
# Produces static HTML/JS/CSS under frontend/dist.
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY frontend/ ./
# Empty = browser calls /api on the same host as the page.
ENV VITE_API_URL=
# Public Clerk key is embedded in client JS.
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
RUN npm run build

# --- Stage 2: build the API bundle ---
# This backend is ESM JavaScript, so npm run build copies src/ to dist/.
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --no-audit --no-fund
COPY backend/ ./backend/
RUN npm run build

# --- Stage 3: runtime image (only prod deps + built assets) ---
# Express serves API routes and static files from public/.
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000 

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# Copy the compiled backend code
COPY --from=backend-build /app/dist ./dist

# CRITICAL: Copy frontend build to the path backend/server.ts expects
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5000
USER node

CMD ["node", "dist/backend/server.js"]