import requests
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import io
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app) 

@app.route('/generate_invoice', methods=['POST'])
def generate_invoice():
    try:
        data = request.json
        logging.debug(f"Received data: {data}")
        
        #hardcoded
        api_key = 'kqkqedmreto8ht4na212ubo3dqudag4oat1of085m7r5cmaclbquo'
       
        # validate API key
        if not api_key:
            logging.error("API key is missing")
            return jsonify({"error": "API key is missing"}), 400
        
        params = {
            'date': data.get('date', ''),
            'number': data.get('number', ''),
            'from': data.get('from', ''),
            'from_address': data.get('from_address', ''),
            'to': data.get('to', ''),
            'ship_to': data.get('ship_to', ''),
            'name': data.get('name', ''),
            'unit_cost': data.get('unit_cost', ''),
            'quantity': data.get('quantity', ''),
            'logo': data.get('logo', ''),
            'currency': data.get('currency', ''),
            'due_date': data.get('due_date', ''),
            'tax': data.get('tax', ''),
            'amount_paid': data.get('amount_paid', ''),
            'locale': data.get('locale', ''),
            'notes': data.get('notes', ''),
            'apiKey': api_key
        }
        
        params = {k: v for k, v in params.items() if v}
        logging.debug(f"Prepared parameters: {params}")  # Log prepared parameters
        
        logging.debug(f"Sending request to API with params: {params}")
        response = requests.get(
            'https://anyapi.io/api/v1/invoice/generate', 
            params=params
        )
       
        logging.debug(f"API Response Status: {response.status_code}")
        logging.debug(f"API Response Content: {response.text}")
        
        if response.status_code == 200:
            return send_file(
                io.BytesIO(response.content),
                mimetype='application/pdf',
                as_attachment=True,
                download_name=f'invoice_{data.get("number", "unknown")}.pdf'
            )
        else:
            logging.error(f"Invoice generation failed: {response.status_code} - {response.text}")
            return jsonify({
                "error": f"Invoice generation failed: {response.status_code}",
                "details": response.text
            }), response.status_code
   
    except Exception as e:
        # catch and log any unexpected errors
        logging.error(f"Error occurred: {e}", exc_info=True)
        return jsonify({
            "error": "An unexpected error occurred",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
