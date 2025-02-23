# /texting-tool/api/text.py
from http.server import BaseHTTPRequestHandler
import json
import os
from twilio.rest import Client

def send_text(to_number, message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_number = os.environ.get('TWILIO_PHONE_NUMBER')
    
    if not all([account_sid, auth_token, from_number]):
        return {"status": "error", "message": "Missing environment variables"}
        
    client = Client(account_sid, auth_token)
    
    try:
        message = client.messages.create(
            from_=from_number,
            body=message_body,
            to=to_number
        )
        return {"status": "success", "message_sid": message.sid}
    except Exception as e:
        return {"status": "error", "message": str(e)}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            health_status = {
                "status": "healthy",
                "twilio_configured": all([
                    os.environ.get('TWILIO_ACCOUNT_SID'),
                    os.environ.get('TWILIO_AUTH_TOKEN'),
                    os.environ.get('TWILIO_PHONE_NUMBER')
                ])
            }
            
            self.wfile.write(json.dumps(health_status).encode())
            return

        self.send_response(404)
        self.end_headers()
        return

    def do_POST(self):
        if self.path == '/api/text':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                data = json.loads(body)
                result = send_text(data.get('to'), data.get('message'))
                
                self.send_response(200 if result['status'] == 'success' else 500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode())
                return
                
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "Invalid JSON"
                }).encode())
                return

        self.send_response(404)
        self.end_headers()
        return