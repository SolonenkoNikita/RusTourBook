import pandas as pd
import json
from pymongo import MongoClient

excel_file = '/home/nikita/Hotels/Гостиницы.xlsx'

df = pd.read_excel(excel_file)

data = df.to_dict(orient='records')

client = MongoClient("mongodb://localhost:27017")  
db = client["hotels_db"]
collection = db["hotels_collection"]

collection.insert_many(data)

print("Данные успешно преобразованы и загружены в MongoDB!")
