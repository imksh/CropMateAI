# CropMate AI
"""
    CropMate AI is a AI model to pridct crop harvest time considering soil and climate condition
"""

# --Imports--

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib 

# --Global variables--
data = pd.read_csv('data/crop_data.csv')
# Synthetic target creation for sensitivity

harvest_times = {
    'Wheat': 120,
    'Corn': 100,
    'Rice': 150,
    'Barley': 90,
    'Soybean': 110,
    'Cotton': 160,
    'Sugarcane': 270,
    'Tomato': 90,
    'Potato': 100,
    'Sunflower': 80
}
np.random.seed(42)

data['Harvest_Days'] = (
    data['Crop_Type'].map(harvest_times) +             
    data['Soil_pH'] * -0.5 +                           
    data['Temperature'] * -1.0 +                        
    data['Humidity'] * 0.3 +                            
    data['Wind_Speed'] * 0.2 +                          
    data['N'] * 0.4 + data['P'] * 0.3 + data['K'] * 0.2 + 
    data['Crop_Yield'] * 0.1 +                          
    np.random.normal(0, 3, len(data))                   
)

# --Functions--

def process_data():
    data.dropna(inplace=True)
    data['Soil_Type'] = data['Soil_Type'].astype('category').cat.codes
    data['Crop_Type'] = data['Crop_Type'].astype('category').cat.codes 
    x = data[['Crop_Type','Soil_Type', 'Soil_pH', 'Temperature', "Humidity", "Wind_Speed", "N", "P", "K", "Crop_Yield"]]
    y = data['Harvest_Days']
    return x, y

def split_data(x, y):
    return train_test_split(x, y, test_size=0.2, random_state=42)

def train_model(X_train, y_train):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    print("MAE:", mean_absolute_error(y_test, y_pred))
    print("R² Score:", r2_score(y_test, y_pred))

# --Main Function--

def main():
    x, y = process_data()
    X_train, X_test, y_train, y_test = split_data(x, y)
    model = train_model(X_train, y_train)
    evaluate_model(model, X_test, y_test)
    joblib.dump(model, 'model.pkl', compress=9)



# --Gaurd--

if __name__ == "__main__" :
    main()

