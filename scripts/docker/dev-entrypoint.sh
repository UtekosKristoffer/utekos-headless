#!/usr/bin/env sh
set -eu

cd /app

hash_file="/app/node_modules/.utekos-package-lock.sha256"
current_hash="$(sha256sum package.json package-lock.json | sha256sum | awk '{ print $1 }')"
stored_hash=""

if [ -f "$hash_file" ]; then
  stored_hash="$(cat "$hash_file")"
fi

if [ ! -x /app/node_modules/.bin/next ] || [ "$stored_hash" != "$current_hash" ]; then
  npm ci --prefer-offline --no-audit --no-fund
  printf '%s\n' "$current_hash" > "$hash_file"
fi

exec "$@"
