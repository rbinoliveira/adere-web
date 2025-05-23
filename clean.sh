#!/bin/bash

# Definir um array com as pastas e arquivos a serem removidos
TARGETS=("node_modules" "dist" ".turbo" ".next" "pnpm-lock.yaml" ".expo" "android" "ios")

echo "Removendo pastas e arquivos: ${TARGETS[*]}..."

# Percorrer a lista e remover diretórios e arquivos
for target in "${TARGETS[@]}"; do
  find . -name "$target" -prune -exec rm -rf {} + 2>/dev/null
done

echo "Limpeza concluída!"
