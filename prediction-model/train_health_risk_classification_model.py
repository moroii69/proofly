import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

try:
    print("Step 1: Loading dataset")
    df = pd.read_csv('clean_health_data.csv')
    print("Dataset Preview:")
    print(df.head())

except FileNotFoundError:
    print("Error: The dataset file 'clean_health_data.csv' was not found.")
    exit(1)
except pd.errors.EmptyDataError:
    print("Error: The dataset file 'clean_health_data.csv' is empty.")
    exit(1)
except Exception as e:
    print(f"An error occurred while loading the dataset: {e}")
    exit(1)

try:
    print("\nStep 2: Data Preprocessing")
    print("\nChecking for missing values in the dataset:")
    print(df.isnull().sum())
    df = df.dropna()

except Exception as e:
    print(f"An error occurred during data preprocessing: {e}")
    exit(1)

try:
    print("\nStep 3: Feature Engineering")
    X = df.drop(columns=['health_risk', 'timestamp'])
    y = df['health_risk']
    print("\nChecking feature types and summary:")
    print(X.info())

except KeyError:
    print("Error: The specified columns 'health_risk' or 'timestamp' do not exist in the dataset.")
    exit(1)
except Exception as e:
    print(f"An error occurred during feature engineering: {e}")
    exit(1)

try:
    print("\nStep 4: Encoding categorical target variable")
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    print("\nEncoded health risk categories:")
    print(label_encoder.classes_)

except Exception as e:
    print(f"An error occurred during label encoding: {e}")
    exit(1)

try:
    print("\nStep 5: Splitting the data into training and test sets")
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

except ValueError:
    print("Error: Unable to split the dataset due to invalid data types or incompatible feature shapes.")
    exit(1)
except Exception as e:
    print(f"An error occurred during data splitting: {e}")
    exit(1)

try:
    print("\nStep 6: Feature Scaling (Standardization)")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("\nMeans and variances after scaling:")
    print("Train data mean:", np.mean(X_train_scaled, axis=0))
    print("Test data mean:", np.mean(X_test_scaled, axis=0))
    print("Train data variance:", np.var(X_train_scaled, axis=0))
    print("Test data variance:", np.var(X_test_scaled, axis=0))

except Exception as e:
    print(f"An error occurred during feature scaling: {e}")
    exit(1)

try:
    print("\nStep 7: Building the Neural Network Model")
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.InputLayer(input_shape=(X_train_scaled.shape[1],)))
    model.add(tf.keras.layers.Dense(128, activation='relu', kernel_initializer='he_normal'))
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.Dropout(0.3))
    model.add(tf.keras.layers.Dense(64, activation='relu', kernel_initializer='he_normal'))
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.Dropout(0.3))
    model.add(tf.keras.layers.Dense(32, activation='relu', kernel_initializer='he_normal'))
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.Dropout(0.3))
    model.add(tf.keras.layers.Dense(3, activation='softmax'))

except Exception as e:
    print(f"An error occurred during model building: {e}")
    exit(1)

try:
    print("\nStep 8: Compiling the model")
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    print("\nModel Summary:")
    model.summary()

except Exception as e:
    print(f"An error occurred during model compilation: {e}")
    exit(1)

try:
    print("\nStep 9: Training the Model")
    early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
    model_checkpoint = ModelCheckpoint('best_health_risk_model.h5', monitor='val_loss', save_best_only=True)
    history = model.fit(X_train_scaled, y_train, epochs=50, batch_size=64,
                        validation_split=0.2, callbacks=[early_stopping, model_checkpoint])

except Exception as e:
    print(f"An error occurred during model training: {e}")
    exit(1)

try:
    print("\nStep 10: Evaluating the Model")
    model.load_weights('best_health_risk_model.h5')
    test_loss, test_accuracy = model.evaluate(X_test_scaled, y_test)
    print(f"\nTest Loss: {test_loss}")
    print(f"Test Accuracy: {test_accuracy * 100:.2f}%")

except Exception as e:
    print(f"An error occurred during model evaluation: {e}")
    exit(1)

try:
    print("\nStep 11: Making Predictions and Evaluating")
    y_pred = model.predict(X_test_scaled)
    y_pred_classes = np.argmax(y_pred, axis=1)

except Exception as e:
    print(f"An error occurred during prediction: {e}")
    exit(1)

try:
    print("\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred_classes)
    print(cm)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.title('Confusion Matrix')
    plt.show()

except Exception as e:
    print(f"An error occurred during confusion matrix visualization: {e}")
    exit(1)

try:
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred_classes, target_names=label_encoder.classes_))

except Exception as e:
    print(f"An error occurred during classification report generation: {e}")
    exit(1)

try:
    print("\nStep 13: Visualizing Training History")
    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(history.history['loss'], label='train_loss')
    plt.plot(history.history['val_loss'], label='val_loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['accuracy'], label='train_accuracy')
    plt.plot(history.history['val_accuracy'], label='val_accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.tight_layout()
    plt.show()

except Exception as e:
    print(f"An error occurred during training history visualization: {e}")
    exit(1)

try:
    print("\nStep 14: Saving the Model")
    model.save('final_health_risk_model.h5')
    print("Model saved as 'final_health_risk_model.h5'.")

except Exception as e:
    print(f"An error occurred during model saving: {e}")
    exit(1)

try:
    print("\nStep 15: Making Predictions on New Data")
    new_data = np.array([[20, 1.75, 75, 120, 80]])
    new_data_scaled = scaler.transform(new_data)
    new_prediction = model.predict(new_data_scaled)
    predicted_class = label_encoder.inverse_transform([np.argmax(new_prediction)])
    print(f"Predicted health risk for new data: {predicted_class[0]}")

except Exception as e:
    print(f"An error occurred during prediction on new data: {e}")
    exit(1)
