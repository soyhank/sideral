#!/usr/bin/env bash
# Reinicia el servidor local de producción en el puerto 3217.
PID=$(netstat -ano | grep ":3217" | grep LISTENING | awk '{print $5}' | head -1)
[ -n "$PID" ] && taskkill //F //PID "$PID" > /dev/null 2>&1
sleep 1
(npx next start -p 3217 > "$TEMP/sideral-server.log" 2>&1 &)
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 1
  curl -s -o /dev/null http://localhost:3217/ && echo "servidor listo" && exit 0
done
echo "el servidor no respondió"; tail -5 "$TEMP/sideral-server.log"; exit 1
