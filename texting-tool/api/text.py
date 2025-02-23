# /texting-tool/api/text.py
from http.server import BaseHTTPRequestHandler
import json
import os
from twilio.rest import Client
from urllib.parse import parse_qs, urlparse

def send_text(message_body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_number = os.environ.get('TWILIO_PHONE_NUMBER')
    to_number = "16692120331"  # Hardcoded number for testing
    
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
        if self.path.startswith('/api/send'):
            # Parse query parameters
            query_components = parse_qs(urlparse(self.path).query)
            message = query_components.get('message', [''])[0]
            
            if not message:
                self._send_json_response(400, {
                    "error": "Missing message parameter"
                })
                return
                
            result = send_text(message)
            
            if result["status"] == "success":
                self._send_json_response(200, result)
            else:
                self._send_json_response(500, result)
            return

        elif self.path == '/api/health':
            self._send_json_response(200, {
                "status": "healthy",
                "twilio_configured": all([
                    os.environ.get('TWILIO_ACCOUNT_SID'),
                    os.environ.get('TWILIO_AUTH_TOKEN'),
                    os.environ.get('TWILIO_PHONE_NUMBER')
                ])
            })
            return

        self._send_json_response(404, {"error": "Not found"})
        return

    def do_POST(self):
        if self.path == '/api/text':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                data = json.loads(body)
                result = send_text(data.get('message'))
                
                if result["status"] == "success":
                    self._send_json_response(200, result)
                else:
                    self._send_json_response(500, result)
                return
                
            except json.JSONDecodeError:
                self._send_json_response(400, {
                    "error": "Invalid JSON"
                })
                return

        self._send_json_response(404, {"error": "Not found"})
        return
        
    def _send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())