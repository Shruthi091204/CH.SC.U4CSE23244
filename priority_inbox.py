import heapq
import json
import urllib.request
import urllib.error
from datetime import datetime

API_URL = "http://20.207.122.201/evaluation-service/notifications"
BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGNzZTIzMjQ0QGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjAwMTUsImlhdCI6MTc3ODA1OTExNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImY2N2JkZjExLWUzOWQtNGIyYy1iYTNiLThkY2VhMGE4MzZhOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNocnV0aGlrYSByYWphbiIsInN1YiI6IjQ4NjkzNzY4LWFmNjYtNDZhMS1hODRkLTM5MDNkOThlZjdjYyJ9LCJlbWFpbCI6ImNoLnNjLnU0Y3NlMjMyNDRAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJ1dGhpa2EgcmFqYW4iLCJyb2xsTm8iOiJjaC5zYy51NGNzZTIzMjQ0IiwiYWNjZXNzQ29kZSI6IlBUQk1tUSIsImNsaWVudElEIjoiNDg2OTM3NjgtYWY2Ni00NmExLWE4NGQtMzkwM2Q5OGVmN2NjIiwiY2xpZW50U2VjcmV0IjoiSHNtcFFCaEZ2WmRZQndGTiJ9.cItu3epZMvUGHcBGSwaZGjs4KCA58rHvZJT-gagCkh0"

TYPE_WEIGHTS = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
}

def fetch_notifications():
    """
    Fetches notifications from the protected API.
    """
    print(f"[*] Fetching notifications from {API_URL}...")
    
    headers = {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Content-Type": "application/json"
    }
    
    req = urllib.request.Request(API_URL, headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = response.read().decode('utf-8')
                result = json.loads(data)
                # The API returns a dict with a 'notifications' key
                if isinstance(result, dict) and "notifications" in result:
                    return result["notifications"]
                return result if isinstance(result, list) else []
            else:
                print(f"[!] Error: Received status code {response.status}")
                return []
    except urllib.error.HTTPError as e:
        print(f"[!] HTTP Error: {e.code} - {e.reason}")
    except urllib.error.URLError as e:
        print(f"[!] URL Error: {e.reason}")
    except Exception as e:
        print(f"[!] Unexpected Error: {e}")
    
    return []

def get_priority_inbox(notifications, limit=10):
    """
    Maintains the top N notifications using a Min-Heap.
    """
    min_heap = []
    
    for note in notifications:
        if not isinstance(note, dict):
            continue
            
        note_type = note.get("Type", "Event")
        weight = TYPE_WEIGHTS.get(note_type, 1)
        timestamp = note.get("Timestamp", "")
        
        # Priority tuple: (Weight, Timestamp, OriginalObject)
        priority_item = (weight, timestamp, note)
        
        if len(min_heap) < limit:
            heapq.heappush(min_heap, priority_item)
        else:
            if priority_item > min_heap[0]:
                heapq.heapreplace(min_heap, priority_item)
                
    top_10 = sorted(min_heap, key=lambda x: (x[0], x[1]), reverse=True)
    return top_10

def display_notifications(top_notifications):
    """
    Prints the notifications to the console in a clear format.
    """
    print("\n" + "="*80)
    print(f"{'RANK':<5} | {'PRIORITY':<10} | {'TYPE':<12} | {'MESSAGE':<30} | {'TIMESTAMP'}")
    print("-" * 80)
    
    for i, item in enumerate(top_notifications, 1):
        weight, ts, note = item
        msg = note.get("Message", "N/A")
        display_msg = (msg[:27] + '...') if len(msg) > 30 else msg
        
        print(f"{i:<5} | {weight:<10} | {note.get('Type', 'N/A'):<12} | {display_msg:<30} | {ts}")
    
    print("="*80 + "\n")

def main():
    notifications = fetch_notifications()
    
    if not notifications:
        print("[!] No notifications fetched. Ensure your Bearer token is valid.")
        return

    print(f"[*] Successfully fetched {len(notifications)} notifications.")
    
    top_10 = get_priority_inbox(notifications, limit=10)
    display_notifications(top_10)

if __name__ == "__main__":
    main()
