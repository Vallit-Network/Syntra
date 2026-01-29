import os
import sys

# Add parent directory to path to import db
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_db, get_seminar_context

def verify():
    print("--- Test 1: Category Search 'Führung' ---")
    context = get_seminar_context("Welche Seminare habt ihr zum Thema Führung?")
    print(context)
    if "Führen durch Persönlichkeit" in context or "Lateral" in context:
         print("✅ PASS: Found leadership seminars")
    else:
         print("❌ FAIL: Did not find leadership seminars")

    print("\n--- Test 2: Specific Seminar 'Zeitmanagement' ---")
    context = get_seminar_context("Erzähl mir was über Zeitmanagement")
    print(context)
    if "Zeitmanagement" in context and "Management" in context:
         print("✅ PASS: Found Zeitmanagement")
    else:
         print("❌ FAIL: Did not find Zeitmanagement")
         
    print("\n--- Test 3: Mixed Query 'Kommunikation und Konflikte' ---")
    context = get_seminar_context("Ich will besser kommunizieren bei Konflikten")
    print(context)
    if "Kommunikation" in context and "Konflikte" in context:
         print("✅ PASS: Found Communication/Conflict context")
    else:
         print("❌ FAIL: Context missing")

if __name__ == "__main__":
    verify()
