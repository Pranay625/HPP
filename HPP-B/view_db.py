"""View database contents"""
import sqlite3

conn = sqlite3.connect('house_price_app.db')
cursor = conn.cursor()

print("=== USERS ===")
cursor.execute("SELECT id, username, email, name, created_at FROM users")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, Username: {row[1]}, Email: {row[2]}, Name: {row[3]}, Created: {row[4]}")

print("\n=== PREDICTIONS ===")
cursor.execute("SELECT id, user_id, predicted_price, med_inc, house_age, created_at FROM predictions")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, User: {row[1]}, Price: ${row[2]}, Income: {row[3]}, Age: {row[4]}, Created: {row[5]}")

conn.close()
