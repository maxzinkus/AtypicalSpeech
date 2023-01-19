# -*- coding: utf-8 -*-
"""create_script_script.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1YUL57gc54uWep2nCcqI6YXh60x6hzhbq
"""

import csv
import pandas as pd
from collections import defaultdict
import json
import requests

train_data_csv_url = "https://raw.githubusercontent.com/forrestpark/AtypicalSpeech/master/data/train_data.csv"
test_data_csv_url = "https://raw.githubusercontent.com/forrestpark/AtypicalSpeech/master/data/test_data.csv"
valid_data_csv_url = "https://raw.githubusercontent.com/forrestpark/AtypicalSpeech/master/data/valid_data.csv"

train_data = pd.read_csv(train_data_csv_url)
test_data = pd.read_csv(test_data_csv_url)
valid_data = pd.read_csv(valid_data_csv_url)

scriptID2utterances = defaultdict(list)
utterance2details = defaultdict(dict)

for data in [train_data, test_data, valid_data]:
  for index, row in data.iterrows():

    utterance = row['transcription']

    details = {"action": row['action'], "object": row['object'], "location": row['location']}

    utterance2details[utterance] = details

create_utterance_detail_url = "http://localhost:3000/utterancedetail/create_utterance_detail"

for utterance, detail in utterance2details.items():
  request_data = json.dumps({"utterance": utterance, "detail": detail})
  res = requests.post(create_utterance_detail_url, data=request_data, headers={"Content-Type": "application/json"})
  print(res.json())