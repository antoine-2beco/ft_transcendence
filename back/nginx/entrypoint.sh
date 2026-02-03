#!/bin/sh
set -eu

CERT_DIR="/etc/nginx/certs"
CERT_KEY="${CERT_DIR}/server.key"
CERT_CRT="${CERT_DIR}/server.crt"

: "${HOSTNAME:=transcendance.local}"
: "${LAN_IP:=127.0.0.1}"

mkdir -p "$CERT_DIR"

rm -f "$CERT_KEY" "$CERT_CRT"

openssl req -x509 -nodes -newkey rsa:2048 -days 825 \
  -keyout "$CERT_KEY" \
  -out "$CERT_CRT" \
  -subj "/CN=${HOSTNAME}" \
  -addext "subjectAltName=DNS:${HOSTNAME},IP:${LAN_IP}"

chmod 600 "$CERT_KEY"

exec "$@"