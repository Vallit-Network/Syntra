import os
import sys

# Add parent directory to path to import db
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_db

def inspect():
    db = get_db()
    if not db:
        print("Failed to connect to DB")
        return

    print("Fetching seminar_qa...")
    try:
        res = db.table('seminar_qa').select('*').limit(5).execute()
        if res.data:
            print(f"Found {len(res.data)} sample rows.")
            print("First row keys:", res.data[0].keys())
            print("First row sample:", res.data[0])
        else:
            print("Table 'seminar_qa' is empty.")
            
        # Check count
        count_res = db.table('seminar_qa').select('id', count='exact').execute()
        print(f"Total rows: {len(count_res.data)}") # count might be in count property depending on lib version, but select id works
        
    except Exception as e:
        print(f"Error inspecting seminar_qa: {e}")

if __name__ == "__main__":
    inspect()
