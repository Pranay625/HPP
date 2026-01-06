"""View specific user's predictions"""
import sqlite3
import sys

username = input("Enter username: ")

conn = sqlite3.connect('house_price_app.db')
cursor = conn.cursor()

# Get user info
cursor.execute("SELECT id, username, email, name, created_at FROM users WHERE username = ?", (username,))
user = cursor.fetchone()

if not user:
    print(f"User '{username}' not found!")
    sys.exit()

print(f"\n=== USER INFO ===")
print(f"ID: {user[0]}")
print(f"Username: {user[1]}")
print(f"Email: {user[2]}")
print(f"Name: {user[3]}")
print(f"Created: {user[4]}")

# Get user's predictions
cursor.execute("""
    SELECT id, predicted_price, med_inc, house_age, ave_rooms, ave_bedrms, 
           population, ave_occup, latitude, longitude, created_at 
    FROM predictions 
    WHERE user_id = ?
    ORDER BY created_at DESC
""", (user[0],))

predictions = cursor.fetchall()

print(f"\n=== PREDICTIONS ({len(predictions)} total) ===")
for p in predictions:
    print(f"\nPrediction #{p[0]}")
    print(f"  Price: ${p[1]}")
    print(f"  Income: {p[2]}, Age: {p[3]}, Rooms: {p[4]}, Bedrooms: {p[5]}")
    print(f"  Population: {p[6]}, Occupancy: {p[7]}")
    print(f"  Location: ({p[8]}, {p[9]})")
    print(f"  Date: {p[10]}")

conn.close()
