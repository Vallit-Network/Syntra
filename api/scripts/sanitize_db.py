import os
import sys
import uuid
from datetime import datetime

# Add parent directory to path to import db
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_db

# 1. Define Strict Seminar List & Categories
# Mapping: Filename (slug) -> {title, category}
# All other seminars in DB will be deleted.
VALID_SEMINARS = {
    # Führung
    "fuehren-durch-persoenlichkeit": {"title": "Führen durch Persönlichkeit", "category": "Führung"},
    "delegation-das-handwerk-der-fuehrung": {"title": "Delegation – Das Handwerk der Führung", "category": "Führung"},
    "gesundheitsorientiertes-fuehren": {"title": "Gesundheitsorientiertes Führen", "category": "Führung"},
    "laterales-fuehren": {"title": "Laterales Führen", "category": "Führung"},
    "leadership-basics": {"title": "Leadership Basics", "category": "Führung"},
    "vom-mitarbeiter-zur-fuehrungskraft": {"title": "Vom Mitarbeiter zur Führungskraft", "category": "Führung"},
    "fuehrungssimulation": {"title": "Führungssimulation", "category": "Führung"},

    # Kommunikation
    "argumentieren-verhandeln": {"title": "Argumentieren und Verhandeln", "category": "Kommunikation"},
    "change-kommunikation": {"title": "Change Kommunikation", "category": "Kommunikation"},
    "gekonnt-visualisieren": {"title": "Gekonnt Visualisieren", "category": "Kommunikation"},
    "kommunikation-im-zielgruppenspezifischen-design": {"title": "Kommunikation im zielgruppenspezifischen Design", "category": "Kommunikation"},
    "konflikterkennung-behandlung-praevention": {"title": "Konflikte erkennen und behandeln", "category": "Kommunikation"},
    "medientraining": {"title": "Medientraining", "category": "Kommunikation"},
    "moderation": {"title": "Moderation", "category": "Kommunikation"},
    "praesentieren-verstaendlich-erklaeren": {"title": "Präsentieren und verständlich erklären", "category": "Kommunikation"},
    "storytelling": {"title": "Storytelling", "category": "Kommunikation"},
    "selbstsicherheit-und-durchsetzungsvermoegen": {"title": "Selbstsicherheit und Durchsetzungsvermögen", "category": "Kommunikation"},

    # Gesundheit
    "gesunde-selbstfuehrung": {"title": "Gesunde Selbstführung", "category": "Gesundheit"},
    "resilienz-staerke-ausdauer": {"title": "Resilienz: Stärke und Ausdauer", "category": "Gesundheit"},
    "resilienz": {"title": "Resilienz", "category": "Gesundheit"},
    "selbstmitgefuehl": {"title": "Selbstmitgefühl", "category": "Gesundheit"},
    "widerstandsfaehigkeit-staerken": {"title": "Widerstandsfähigkeit stärken", "category": "Gesundheit"},
    "intuition": {"title": "Intuition", "category": "Gesundheit"}, # Assumed category

    # Management
    "betriebsorganisation": {"title": "Betriebsorganisation", "category": "Management"},
    "bwl-fuer-nicht-bwler": {"title": "BWL für Nicht-BWLer", "category": "Management"},
    "krisenmanagement-fuer-projektmanager": {"title": "Krisenmanagement für Projektmanager", "category": "Management"},
    "praxis-werkstatt-projektmanagement": {"title": "Praxis-Werkstatt Projektmanagement", "category": "Management"},
    "projekte-aus-der-krise-retten": {"title": "Projekte aus der Krise retten", "category": "Management"},
    "projektmanagement-basistraining": {"title": "Projektmanagement Basistraining", "category": "Management"},
    "selbstmanagement": {"title": "Selbstmanagement", "category": "Management"},
    "zeitmanagement": {"title": "Zeitmanagement", "category": "Management"},
    "soft-skills-fuer-controller": {"title": "Soft Skills für Controller", "category": "Management"},
    "selbsterkenntnis-und-selbstfuehrung": {"title": "Selbsterkenntnis und Selbstführung", "category": "Management"}, # Or Leadership/Health?

    # Change
    "change-kompetenz": {"title": "Change Kompetenz", "category": "Change"},
    "gruppendynamik-in-teams": {"title": "Gruppendynamik in Teams", "category": "Change"},
    "zusammenarbeit-von-generationen": {"title": "Zusammenarbeit von Generationen", "category": "Change"},
    "lebensphasen": {"title": "Lebensphasen", "category": "Change"}, # Assumed
}

def normalize_string(s):
    return s.lower().strip().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss").replace("-", " ")

def sanitize():
    print(f"Starting sanitization...")
    db = get_db()
    if not db:
        print("Database connection failed.")
        return

    # 1. Fetch all existing entries
    try:
        res = db.table('seminar_qa').select('*').execute()
        existing_rows = res.data
        print(f"Fetched {len(existing_rows)} existing rows.")
    except Exception as e:
        print(f"Error fetching rows: {e}")
        return

    # 2. Identify Valid vs Invalid
    kept_count = 0
    deleted_count = 0
    updated_count = 0
    
    # We will map "Title" to rows to check coverage later
    processed_titles = set()

    for row in existing_rows:
        row_id = row['id']
        name = row['seminar_name']
        
        # Fuzzy match attempt
        matched_slug = None
        for slug, info in VALID_SEMINARS.items():
            # Check matches against Title or Slug (normalized)
            n_row = normalize_string(name)
            n_title = normalize_string(info['title'])
            n_slug = normalize_string(slug)
            
            if n_row == n_title or n_row == n_slug or n_title in n_row:
                matched_slug = slug
                break
        
        if matched_slug:
            # Valid Seminar - Update Category if needed
            info = VALID_SEMINARS[matched_slug]
            processed_titles.add(matched_slug)
            
            updates = {}
            if row.get('category') != info['category']:
                updates['category'] = info['category']
            
            # Normalize title to be officially perfect
            if row['seminar_name'] != info['title']:
                updates['seminar_name'] = info['title']
                
            if updates:
                try:
                    db.table('seminar_qa').update(updates).eq('id', row_id).execute()
                    updated_count += 1
                    # print(f"Updated {name} -> {updates}")
                except Exception as e:
                    print(f"Failed to update {name}: {e}")
            
            kept_count += 1
        else:
            # Invalid - Delete
            try:
                # print(f"Deleting invalid seminar: {name}")
                db.table('seminar_qa').delete().eq('id', row_id).execute()
                deleted_count += 1
            except Exception as e:
                print(f"Failed to delete {name}: {e}")

    print(f"Sanitization Complete: Kept {kept_count}, Updated {updated_count}, Deleted {deleted_count}")

    # 3. Insert Missing Seminars (Placeholders)
    # If a valid seminar has NO entries in data, we create a default one so the bot knows about it.
    missing_slugs = [s for s in VALID_SEMINARS.keys() if s not in processed_titles]
    
    if missing_slugs:
        print(f"Found {len(missing_slugs)} seminars with no entries. Inserting defaults...")
        for slug in missing_slugs:
            info = VALID_SEMINARS[slug]
            # Create a generic entry
            # In a real scenario, we would scrape content. For now, we seed it so the bot isn't finding "nothing".
            
            placeholder_content = {
                "seminar_name": info['title'],
                "category": info['category'],
                "question": f"Was ist das Seminar {info['title']}?",
                "answer": f"Das Seminar '{info['title']}' gehört zum Bereich {info['category']}. Kontaktieren Sie uns für Details zu Inhalten und Terminen. ||| URL: https://wtm-consulting.vercel.app/seminare/{slug}.html",
                "keywords": [info['category'].lower(), "seminar"],
                "created_at": datetime.utcnow().isoformat()
            }
            try:
                db.table('seminar_qa').insert(placeholder_content).execute()
                print(f"Inserted placeholder for: {info['title']}")
            except Exception as e:
                print(f"Failed to insert placeholder for {slug}: {e}")

if __name__ == "__main__":
    sanitize()
