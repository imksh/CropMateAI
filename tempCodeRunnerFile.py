from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)
model = joblib.load('model.pkl')

# Categorical encoding maps (should match training logic)
crop_map = {'Wheat': 0, 'Corn': 1, 'Rice': 2, 'Barley': 3, 'Soybean': 4, 'Cotton': 5,
            'Sugarcane': 6, 'Tomato': 7, 'Potato': 8, 'Sunflower': 9}
soil_map = {'Peaty': 0, 'Loamy': 1, 'Sandy': 2, 'Saline': 3, 'Clay': 4}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    sample = np.array([[
        crop_map[data['Crop_Type']],
        soil_map[data['Soil_Type']],
        float(data['Soil_pH']),
        float(data['Temperature']),
        float(data['Humidity']),
        float(data['Wind_Speed']),
        int(data['N']),
        int(data['P']),
        int(data['K']),
        float(data['Crop_Yield']),
    ]])

    prediction = model.predict(sample)[0]
    return jsonify({'harvest_days': round(prediction, 2)})

if __name__ == '__main__':
    app.run(debug=True)