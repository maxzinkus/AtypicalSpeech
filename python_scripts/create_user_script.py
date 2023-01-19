import json
import requests

create_user_url = "http://localhost:3000/user/create"

request_data = json.dumps({"user_id": "test1"})
res = requests.post(create_user_url, data=request_data, headers={"Content-Type": "application/json"})
print(res.json())