import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import requests
import json
import base64
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

class AppointmentService:
    @staticmethod
    def get_zoom_access_token():
        account_id = os.getenv('ZOOM_ACCOUNT_ID')
        client_id = os.getenv('ZOOM_CLIENT_ID')
        client_secret = os.getenv('ZOOM_CLIENT_SECRET')

        if not all([account_id, client_id, client_secret]):
            print("Missing Zoom credentials")
            return None

        url = f"https://zoom.us/oauth/token?grant_type=account_credentials&account_id={account_id}"
        auth_header = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

        try:
            response = requests.post(url, headers={'Authorization': f'Basic {auth_header}'})
            if response.status_code == 200:
                return response.json().get('access_token')
            else:
                print(f"Zoom Token Error: {response.text}")
                return None
        except Exception as e:
            print(f"Zoom Token Exception: {e}")
            return None

    @staticmethod
    def create_zoom_meeting(access_token, topic, start_time_str):
        if not access_token:
            return None

        url = "https://api.zoom.us/v2/users/me/meetings"
        
        # Parse flexible time string or assume ISO
        # Ideally, start_time_str should be ISO 8601
        
        payload = {
            "topic": topic,
            "type": 2,
            "start_time": start_time_str,
            "duration": 60,
            "timezone": "Europe/Berlin",
            "settings": {
                "host_video": True,
                "participant_video": True,
                "join_before_host": False,
                "mute_upon_entry": True,
                "waiting_room": True
            }
        }

        try:
            response = requests.post(
                url, 
                headers={
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/json'
                },
                json=payload
            )
            if response.status_code == 201:
                return response.json()
            else:
                print(f"Zoom Create Meeting Error: {response.text}")
                return None
        except Exception as e:
            print(f"Zoom Create Exception: {e}")
            return None

    @staticmethod
    def generate_ics(start_time_iso, duration_minutes, subject, description, location, organizer_name, organizer_email):
        try:
            dt_start = datetime.fromisoformat(start_time_iso.replace('Z', '+00:00'))
        except ValueError:
            # Fallback if parsing fails, try simple replace
            dt_start = datetime.now() # Safety callback

        dt_end = dt_start + timedelta(minutes=duration_minutes)

        def format_ics_date(dt):
            return dt.strftime('%Y%m%dT%H%M%SZ')

        uid = f"{int(datetime.now().timestamp())}@wtm-consulting.de"
        
        formatted_desc = description.replace(chr(10), '\\n')
        
        ics_content = f"""BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vallit//WTM Consulting//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:{uid}
DTSTAMP:{format_ics_date(datetime.now())}
DTSTART:{format_ics_date(dt_start)}
DTEND:{format_ics_date(dt_end)}
SUMMARY:{subject}
DESCRIPTION:{formatted_desc}
LOCATION:{location}
ORGANIZER;CN={organizer_name}:mailto:{organizer_email}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR"""
        return ics_content

    @staticmethod
    def insert_google_calendar_event(summary, location, description, start_time_iso, duration_minutes=60):
        """Inserts an event into the Google Calendar specified by CALENDAR_ID."""
        try:
            creds_path = os.path.join(os.path.dirname(__file__), 'credentials.json')
            if not os.path.exists(creds_path):
                print("Google Calendar Error: credentials.json not found.")
                return False

            calendar_id = os.getenv('CALENDAR_ID')
            if not calendar_id:
                print("Google Calendar Error: CALENDAR_ID not set.")
                return False

            SCOPES = ['https://www.googleapis.com/auth/calendar']
            creds = service_account.Credentials.from_service_account_file(creds_path, scopes=SCOPES)
            service = build('calendar', 'v3', credentials=creds)

            # Parse start time
            try:
                dt_start = datetime.fromisoformat(start_time_iso.replace('Z', '+00:00'))
            except ValueError:
                dt_start = datetime.now() # Fallback

            dt_end = dt_start + timedelta(minutes=duration_minutes)

            event = {
                'summary': summary,
                'location': location,
                'description': description,
                'start': {
                    'dateTime': dt_start.isoformat(),
                    'timeZone': 'Europe/Berlin',
                },
                'end': {
                    'dateTime': dt_end.isoformat(),
                    'timeZone': 'Europe/Berlin',
                },
            }

            created_event = service.events().insert(calendarId=calendar_id, body=event).execute()
            print(f"Google Calendar Event created: {created_event.get('htmlLink')}")
            return True

        except Exception as e:
            print(f"Google Calendar Exception: {e}")
            return False

    @staticmethod
    def send_confirmation_email(user_email, user_name, topic, date_time, zoom_link, ics_content, company_name=None, session_id=None):
        # Update default host to Strato (WTM Provider)
        smtp_host = os.getenv('SMTP_HOST', 'smtp.strato.de')
        smtp_port = int(os.getenv('SMTP_PORT', 465))
        smtp_user = os.getenv('SMTP_USER', 'Kontakt@wtm-consulting.de')
        smtp_pass = os.getenv('SMTP_PASS', '#TRTRMWgrind2026!0409')
        
        # WTM Specific Contact
        wtm_contact_email = "kontakt@wtm-consulting.de"
        sender_email = "kontakt@wtm-consulting.de"
        
        if not all([smtp_user, smtp_pass]):
            print("Missing SMTP credentials")
            return False

        # --- User Email (Branded & Concise) ---
        msg = MIMEMultipart()
        # Use a friendly name in the From header
        msg['From'] = f'"WTM Consulting" <{sender_email}>' 
        msg['To'] = user_email
        msg['Reply-To'] = "contact@vallit.net" # As requested
        msg['Subject'] = f"Ihr Termin: {topic}"

        # Clean formatting for email display
        formatted_date = date_time
        try:
             dt = datetime.fromisoformat(date_time.replace('Z', '+00:00'))
             formatted_date = dt.strftime('%d.%m.%Y um %H:%M Uhr')
        except:
            pass

        html_body_user = f"""
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <!-- Header with Logo -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: #3D7A77; font-size: 24px;">WTM Consulting</h1>
            </div>
            
            <div style="padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
                <h2 style="color: #2c3e50; margin-top: 0;">Terminbestätigung</h2>
                <p>Hallo {user_name},</p>
                <p>Ihr Termin wurde erfolgreich gebucht. Hier sind die Details:</p>
                
                <div style="background-color: #f0f7f7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                    <p style="margin: 5px 0;"><strong>Thema:</strong> {topic}</p>
                    <p style="margin: 5px 0;"><strong>Zeit:</strong> {formatted_date}</p>
                    <p style="margin: 15px 0;">
                        <a href="{zoom_link}" style="background-color: #3D7A77; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Zum Zoom Meeting</a>
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #666;">Ein Kalendereintrag (ICS) befindet sich im Anhang.</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="font-size: 12px; color: #999; text-align: center;">
                    <p>Powered by Vallit</p>
                    <p>WTM Consulting | Kontakt: <a href="mailto:contact@vallit.net" style="color: #666;">contact@vallit.net</a></p>
                </div>
            </div>
        </div>
        """
        msg.attach(MIMEText(html_body_user, 'html'))
        part = MIMEApplication(ics_content.encode('utf-8'), Name="termin.ics")
        part['Content-Disposition'] = 'attachment; filename="termin.ics"'
        msg.attach(part)

        # --- Admin Email (Detailed) ---
        admin_msg = MIMEMultipart()
        admin_msg['From'] = f'"WTM Bot" <{sender_email}>'
        admin_msg['To'] = wtm_contact_email
        admin_msg['Subject'] = f"📝 NEUE BUCHUNG: {user_name} - {topic}"

        html_body_admin = f"""
        <div style="font-family: monospace; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; padding: 20px;">
            <h2 style="color: #d32f2f;">New Booking Alert</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #eee;"><th style="padding: 8px; text-align: left;">Field</th><th style="padding: 8px; text-align: left;">Value</th></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Customer Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{user_name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{company_name or 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:{user_email}">{user_email}</a></td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Topic</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{topic}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date/Time (UTC)</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{date_time}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Formatted Time</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{formatted_date}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Zoom Link</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="{zoom_link}">{zoom_link}</a></td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Session ID</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">{session_id or 'Unknown'}</td></tr>
            </table>
            <p style="margin-top: 20px;"><em>This booking has been saved to the database.</em></p>
        </div>
        """
        admin_msg.attach(MIMEText(html_body_admin, 'html'))
        admin_part = MIMEApplication(ics_content.encode('utf-8'), Name="booking.ics")
        admin_part['Content-Disposition'] = 'attachment; filename="booking.ics"'
        admin_msg.attach(admin_part)

        try:
            print(f"Connecting to SMTP {smtp_host}:{smtp_port}...")
            # Use Strato specific SSL context if needed, but standard usually works
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15) as server:
                server.login(smtp_user, smtp_pass)
                
                # Send to User
                server.send_message(msg)
                print("User confirmation email sent.")
                
                # Send to Admin
                server.send_message(admin_msg)
                print(f"Admin notification email sent to {wtm_contact_email}.")
                
            return True
        except Exception as e:
            print(f"SMTP Error: {e}")
            return False

    @staticmethod
    def create_appointment(db_module, company_id, session_id, name, email, date_time, purpose="General", company_name=None, topic_type="General"):
        try:
            print(f"Creating appointment for {name} ({email}) at {date_time}...")

            # 0. Validate Date/Time
            iso_start_time = date_time
            dt_obj = None
            try:
                # Try simple ISO parse
                if 'T' in date_time:
                    dt_obj = datetime.fromisoformat(date_time.replace('Z', '+00:00'))
                else:
                    # Try basic format YYYY-MM-DD HH:MM:SS
                    dt_obj = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
                    iso_start_time = dt_obj.strftime('%Y-%m-%dT%H:%M:%SZ')
            except Exception as e:
                print(f"Date Parsing Error: {e}")
                # Fallback to simple check or let Zoom handle it currently?
                # Ideally we fail here if invalid
                pass

            if dt_obj:
                # Rule 1: 1.5 days notice (36 hours)
                # Use naive comparison if dt_obj is naive, else aware
                now = datetime.now()
                if dt_obj.tzinfo:
                   now = datetime.now(dt_obj.tzinfo)
                
                if dt_obj < (now + timedelta(hours=36)):
                    msg = "Booking too soon. Please choose a time at least 1.5 days in advance."
                    print(msg)
                    return {"error": msg}
                
                # Rule 2: 8am to 6pm
                # Assuming simple hour check (ignoring specific timezone logic complexity for now, usually safe for local ops)
                if not (8 <= dt_obj.hour < 18):
                    msg = "Our business hours are 8am to 6pm. Please choose a time within this range."
                    print(msg)
                    return {"error": msg}

            
            # 1. Zoom
            zoom_token = AppointmentService.get_zoom_access_token()
            
            # Construct rich topic
            display_topic = f"WTM {topic_type}: {purpose}"
            if company_name:
                display_topic += f" ({company_name})"
            
            zoom_meeting = AppointmentService.create_zoom_meeting(zoom_token, display_topic, iso_start_time)
            
            zoom_join_url = zoom_meeting.get('join_url') if zoom_meeting else "Pending (Zoom Error)"
            zoom_start_url = zoom_meeting.get('start_url') if zoom_meeting else ""
            meeting_id = str(zoom_meeting.get('id', '')) if zoom_meeting else ""

            # 2. Save to DB using Supabase client
            try:
                # Enrich purpose for DB storage
                db_purpose = f"[{topic_type}] {purpose}"
                if company_name:
                    db_purpose += f" | Company: {company_name}"
                db_purpose += f" | Zoom: {zoom_join_url}"
                
                appointment_data = {
                    "company_id": company_id,
                    "chat_session_id": session_id,
                    "customer_name": name,
                    "customer_email": email,
                    "appointment_date": iso_start_time, # Store ISO
                    "purpose": db_purpose,
                    "status": "confirmed"
                }
                
                result = db_module.get_db().table('chat_appointments').insert(appointment_data).execute()
                record = result.data[0] if result.data else None
            except Exception as db_e:
                print(f"DB Error: {db_e}")
                record = {"id": "offline-id"}

            # 3. Email & ICS
            ics_content = AppointmentService.generate_ics(
                iso_start_time, 
                60, 
                display_topic, 
                f"Topic: {display_topic}\\nZoom: {zoom_join_url}\\nClient: {name}\\nCompany: {company_name or 'N/A'}", 
                zoom_join_url, 
                "WTM Consulting", 
                "kontakt@wtm-consulting.de"
            )
            
            email_sent = AppointmentService.send_confirmation_email(
                email, name, display_topic, iso_start_time, zoom_join_url, ics_content,
                company_name=company_name, session_id=session_id
            )
            
            # 4. Google Calendar (Direct Insert)
            try:
                # Format description for GCal
                gcal_desc = f"""
Meeting Topic: {display_topic}
Client: {name} ({email})
Company: {company_name or 'N/A'}
Zoom Link: {zoom_join_url}

Purpose Note: {purpose}
"""
                AppointmentService.insert_google_calendar_event(
                    summary=display_topic,
                    location=zoom_join_url,
                    description=gcal_desc,
                    start_time_iso=iso_start_time,
                    duration_minutes=60
                )
            except Exception as gcal_e:
                print(f"Google Calendar Insert Error: {gcal_e}")
                # Don't fail the booking if calendar sync fails

            return record

        except Exception as e:
            print(f"General Booking Error: {e}")
            return None
