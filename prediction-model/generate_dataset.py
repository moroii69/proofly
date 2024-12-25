import random
import pandas as pd
import time
import sys
from datetime import datetime, timedelta
from tqdm import tqdm
from colorama import init, Fore, Style
import itertools

init(autoreset=True)

metric_options = {
    'diabetes': [
        {'value': 'bloodGlucose', 'label': 'blood glucose', 'unit': 'mg/dL'},
        {'value': 'hba1c', 'label': 'HbA1c', 'unit': '%'},
        {'value': 'bloodPressure', 'label': 'blood pressure', 'unit': 'mmHg'},
    ],
    'hypertension': [
        {'value': 'systolic', 'label': 'systolic pressure', 'unit': 'mmHg'},
        {'value': 'diastolic', 'label': 'diastolic pressure', 'unit': 'mmHg'},
        {'value': 'heartRate', 'label': 'heart rate', 'unit': 'bpm'},
    ],
    'copd': [
        {'value': 'oxygenSaturation', 'label': 'oxygen saturation', 'unit': '%'},
        {'value': 'peakFlow', 'label': 'peak flow', 'unit': 'L/min'},
        {'value': 'respiratoryRate', 'label': 'respiratory rate', 'unit': 'breaths/min'},
    ],
    'ckd': [
        {'value': 'creatinine', 'label': 'creatinine', 'unit': 'mg/dL'},
        {'value': 'gfr', 'label': 'GFR', 'unit': 'mL/min'},
        {'value': 'bloodPressure', 'label': 'blood pressure', 'unit': 'mmHg'},
    ],
    'chf': [
        {'value': 'weight', 'label': 'weight', 'unit': 'kg'},
        {'value': 'bloodPressure', 'label': 'blood pressure', 'unit': 'mmHg'},
        {'value': 'heartRate', 'label': 'heart rate', 'unit': 'bpm'},
    ]
}

value_range = {
    'diabetes': {
        'bloodGlucose': {'min': 50, 'max': 400},
        'hba1c': {'min': 4, 'max': 15},
        'bloodPressure': {'min': 90, 'max': 180},
    },
    'hypertension': {
        'systolic': {'min': 90, 'max': 180},
        'diastolic': {'min': 60, 'max': 120},
        'heartRate': {'min': 40, 'max': 200},
    },
    'copd': {
        'oxygenSaturation': {'min': 80, 'max': 100},
        'peakFlow': {'min': 50, 'max': 800},
        'respiratoryRate': {'min': 10, 'max': 40},
    },
    'ckd': {
        'creatinine': {'min': 0.5, 'max': 2.0},
        'gfr': {'min': 30, 'max': 120},
        'bloodPressure': {'min': 90, 'max': 180},
    },
    'chf': {
        'weight': {'min': 30, 'max': 300},
        'bloodPressure': {'min': 90, 'max': 180},
        'heartRate': {'min': 40, 'max': 200},
    }
}

def generate_random_value(metric, condition):
    value = random.uniform(value_range[condition][metric]['min'], value_range[condition][metric]['max'])
    return round(value, 2)

def generate_health_risk(blood_pressure):
    if blood_pressure < 120:
        return 'LOW'
    elif blood_pressure < 140:
        return 'NORMAL'
    else:
        return 'HIGH'

def generate_confidence():
    return random.randint(80, 100)

def loading_spinner():
    spinner = itertools.cycle(['|', '/', '-', '\\'])
    for _ in range(30):
        sys.stdout.write(f'\r{Fore.GREEN}Generating data... {next(spinner)}')
        sys.stdout.flush()
        time.sleep(0.1)

def animated_progress_bar(task_name, total_steps):
    for i in tqdm(range(total_steps), desc=task_name, ncols=100, bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}"):
        time.sleep(0.1)

def generate_dataset(num_rows):
    data = []
    for _ in tqdm(range(num_rows), desc="Generating Rows", ncols=100, bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}"):
        row = {}
        for condition, metrics in metric_options.items():
            for metric in metrics:
                value = generate_random_value(metric['value'], condition)
                row[f"{condition}_{metric['value']}"] = value
        
        blood_pressure = row.get('diabetes_bloodPressure') or row.get('hypertension_systolic')
        health_risk = generate_health_risk(blood_pressure)
        confidence = generate_confidence()
        
        row['health_risk'] = health_risk
        row['confidence'] = confidence
        
        timestamp = (datetime.now() - timedelta(minutes=random.randint(0, 1440))).strftime('%Y-%m-%d %H:%M:%S')
        row['timestamp'] = timestamp
        
        data.append(row)
        
    return pd.DataFrame(data)

def save_to_csv(df, filename):
    print(f"{Fore.YELLOW}Saving the data to CSV...")
    animated_progress_bar("Saving Data", 100)
    df.to_csv(filename, index=False)
    print(f"{Fore.CYAN}Dataset has been saved to {filename}.")

def main():
    num_rows = 424657534  # Adjust based on desired dataset size, it's gonna be big big big.
    print(f"{Style.BRIGHT}{Fore.MAGENTA}Starting dataset generation...")

    # Simulate loading spinner during data generation – keep the user entertained
    loading_spinner()

    # Generate the dataset
    df = generate_dataset(num_rows)

    # Save the dataset to CSV
    save_to_csv(df, "clean_health_data.csv")

# Run the program – and we're off!
if __name__ == "__main__":
    main()
