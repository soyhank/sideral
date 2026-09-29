-- Guardar decisiones usa "insertar o actualizar", que exige permiso de actualización
-- sobre todas las columnas enviadas. La regla por fila sigue exigiendo ser integrante
-- de la empresa y que el trimestre esté abierto.
grant update (company_id, game_id, round, data, forecast, submitted) on sideral.decisions to authenticated;
