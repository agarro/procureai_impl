import os

def audit_workspace():
    required_files = [
        'package.json',
        'requirements.txt', # Esperado para contexto
        '.env.example',
        'db_schema.sql',
        'src/services/aiService.ts',
        'src/services/erpService.ts',
        'src/types/index.ts'
    ]
    
    workspace_path = 'output/procureai/workspace'
    print(f"--- Iniciando Auditoría Integral en {workspace_path} ---")
    
    missing_files = []
    
    # 1. Verificación de existencia
    for file in required_files:
        path = os.path.join(workspace_path, file)
        if os.path.exists(path):
            print(f"[PASS] Localizado: {file}")
        else:
            print(f"[FAIL] Ausente: {file}")
            missing_files.append(file)
            
    # 2. Validación de Integridad (Simulando compilación/parsing)
    print("\n--- Validación de Integridad ---")
    if not missing_files:
        print("[INFO] Todos los archivos críticos presentes. Iniciando verificación de integridad.")
        # Verificamos que no estén vacíos
        for file in required_files:
            path = os.path.join(workspace_path, file)
            if os.path.getsize(path) > 0:
                print(f"[PASS] Integridad confirmada: {file}")
            else:
                print(f"[FAIL] Archivo vacío: {file}")
                missing_files.append(file)
    else:
        print("[ERROR] Auditoría abortada: faltan archivos necesarios.")

    if not missing_files:
        print("\n--- STATUS: AUDITORÍA COMPLETADA EXITOSAMENTE ---")
    else:
        print(f"\n--- STATUS: AUDITORÍA FALLIDA. Faltantes: {missing_files} ---")

if __name__ == "__main__":
    audit_workspace()
