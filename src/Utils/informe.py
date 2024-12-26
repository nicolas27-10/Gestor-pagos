import pandas as pd

def exportar_informe(json_file_path):
    # Leer el archivo JSON con pandas
    try:
        data = pd.read_json(json_file_path)
        
        # Opcional: Verificar los datos cargados
        print(data.head())

        # Exportar a Excel
        output_file = 'Informe_Alumnos.xlsx'
        data.to_excel(output_file, index=False)

        print(f'Informe exportado con éxito en {output_file}')
    except Exception as e:
        print(f"Error al procesar el archivo JSON: {e}")