#!/usr/bin/env bash
# Usage:
#   ./deploy.sh                       # uses defaults below
#   VPS_HOST=1.2.3.4 ./deploy.sh      # override inline
set -euo pipefail

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-YOUR_VPS_IP}"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/launchmap}"
REPO="git@github.com:adminpipelabs/launchmap.git"
BRANCH="${BRANCH:-main}"

if [[ "$VPS_HOST" == "YOUR_VPS_IP" ]]; then
  echo "ERROR: set VPS_HOST before deploying."
  echo "  VPS_HOST=1.2.3.4 ./deploy.sh"
  exit 1
fi

echo "→ Deploying branch '$BRANCH' to $VPS_USER@$VPS_HOST:$DEPLOY_DIR"

ssh -t "$VPS_USER@$VPS_HOST" "
  set -e

  # ── First-run setup ──────────────────────────────────────────────────────
  if [ ! -d $DEPLOY_DIR ]; then
    echo 'First deploy — cloning repo...'
    git clone --branch $BRANCH $REPO $DEPLOY_DIR
  fi

  cd $DEPLOY_DIR

  # ── Pull latest code ──────────────────────────────────────────────────────
  git fetch origin
  git checkout $BRANCH
  git reset --hard origin/$BRANCH

  # ── Gate on .env ──────────────────────────────────────────────────────────
  if [ ! -f .env ]; then
    echo ''
    echo 'ERROR: .env not found on server.'
    echo 'Copy .env.example → .env and fill in your keys, then re-run deploy.'
    exit 1
  fi

  # ── Build & restart ───────────────────────────────────────────────────────
  docker compose build --no-cache app
  docker compose up -d --remove-orphans
  docker compose ps
"

echo ""
echo "Deploy complete → http://$VPS_HOST"
