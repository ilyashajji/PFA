import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elearning.settings')
django.setup()

def test_database_connection():
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            print("✅ Connexion à la base de données réussie!")
            print(f"Base de données connectée : {connection.settings_dict['NAME']}")
            
            # Vérifier les tables existantes
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print("\nTables existantes :")
            for table in tables:
                print(f"- {table[0]}")
            
    except Exception as e:
        print("❌ Erreur de connexion à la base de données:")
        print(e)

if __name__ == "__main__":
    test_database_connection()
