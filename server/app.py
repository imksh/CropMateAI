from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
model = joblib.load(BASE_DIR / "model.pkl")
FEATURE_COLUMNS = [
    'Crop_Type',
    'Soil_Type',
    'Soil_pH',
    'Temperature',
    'Humidity',
    'Wind_Speed',
    'N',
    'P',
    'K',
    'Crop_Yield',
]

@app.route('/ok', methods=['GET'])
def check():
    return "OK"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json or {}

    missing_fields = [field for field in FEATURE_COLUMNS if field not in data]
    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        sample = {
            'Crop_Type': str(data['Crop_Type']),
            'Soil_Type': str(data['Soil_Type']),
            'Soil_pH': float(data['Soil_pH']),
            'Temperature': float(data['Temperature']),
            'Humidity': float(data['Humidity']),
            'Wind_Speed': float(data['Wind_Speed']),
            'N': float(data['N']),
            'P': float(data['P']),
            'K': float(data['K']),
            'Crop_Yield': float(data['Crop_Yield']),
        }
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid input types provided.'}), 400

    sample_df = pd.DataFrame([sample], columns=FEATURE_COLUMNS)
    prediction = model.predict(sample_df)[0]
    return jsonify({'harvest_days': round(float(prediction), 2)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8001, debug=True)