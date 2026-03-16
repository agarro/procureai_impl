import os

def audit_workspace():
    workspace_path = 'output/procureai/workspace'
    required_files = [
        'package.json',
        'requirements.txt',
        '.env.example',
        'db_schema.sql',
        'src/services/aiService.ts',
        'src/services/erpService.ts',
        'src/types/index.ts'
    ]
    
    print(f"--- Iniciando Auditoría Integral en {workspace_path} ---")
    
    failed = False
    for file in required_files:
        path = os.path.join(workspace_path, file)
        if os.path.exists(path):
            if os.path.getsize(path) > 0:
                print(f"[PASS] Localizado e íntegro: {file}")
            else:
                print(f"[FAIL] Archivo vacío: {file}")
                failed = True
        else:
            print(f"[FAIL] Ausente: {file}")
            failed = True
            
    if not failed:
        print("\n--- STATUS: AUDITORÍA COMPLETADA EXITOSAMENTE ---")
    else:
        print("\n--- STATUS: AUDITORÍA FALLIDA ---")

if __name__ == "__main__":
    audit_workspace()
