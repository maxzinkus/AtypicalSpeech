import requests
import json

request_url = "http://localhost:3000/script/create"
request_data = {
    "id":"102",
    "utterances": {"utterances": ["", "final"]}
}

response = requests.post(request_url, data=json.dumps(request_data), headers={"Content-Type": "application/json"})
print(response.json())