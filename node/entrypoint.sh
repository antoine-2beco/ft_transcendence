#!/bin/sh
set -eu

CERT_DIR="/app/certs"
CERT_KEY="$CERT_DIR/server.key"
CERT_CRT="$CERT_DIR/server.crt"

mkdir -p "$CERT_DIR"

echo "Generating self-signed cert for internal HTTPS (CN=node, SAN=DNS:node)..."
rm -f "$CERT_KEY" "$CERT_CRT"

openssl req -x509 -nodes -newkey rsa:2048 -days 30 \
    -keyout "$CERT_KEY" \
    -out "$CERT_CRT" \
    -subj "/CN=node" \
    -addext "subjectAltName=DNS:node"

chmod 600 "$CERT_KEY"

exec "$@"