import pandas as pd
import openai
from flask import Flask, request, jsonify, render_template
from rapidfuzz import process, fuzz
import os
from dotenv import load_dotenv

df = pd.read_csv("medicine_dataset.csv")

# Initialize Flask app
app = Flask(__name__, static_folder="static", template_folder="templates")

load_dotenv() 

openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to find matching medicines
def find_matching_medicines(query):
    query = query.lower()
    medicine_names = df['name'].dropna().tolist()
    matches = process.extract(query, medicine_names, limit=5, scorer=fuzz.partial_ratio)
    matched_meds = [match[0] for match in matches if match[1] > 60]
    return matched_meds if matched_meds else None

# Function to find substitutes
def get_substitutes(medicine_name):
    row = df[df['name'].str.lower() == medicine_name.lower()]
    if row.empty:
        return None
    substitutes = row.iloc[0][['substitute0', 'substitute1', 'substitute2', 'substitute3', 'substitute4']].dropna().tolist()
    return substitutes if substitutes else None

# Function to get side effects
def get_side_effects(medicine_name):
    row = df[df['name'].str.lower() == medicine_name.lower()]
    if row.empty:
        return None
    side_effects = row.iloc[0][[col for col in df.columns if col.startswith('sideEffect')]].dropna().tolist()
    return side_effects if side_effects else None

# AI function to determine specialist based on symptoms
def get_specialist_recommendation(user_query):
    prompt = (
        f"The user is asking which doctor specialist to consult for: {user_query}. "
        "Provide a short, clear recommendation (less than 50 words) mentioning the type of specialist required. "
        "Ensure the response is medically sound."
    )

    response = openai.chat.completions.create(
        model="gpt-4o-mini-2024-07-18",
        max_tokens=100,
        messages=[
            {"role": "system", "content": "You are a knowledgeable medical assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def generate_ai_response(user_query, substitutes):
    prompt = (
        f"User asked about {user_query}. The available substitutes are: "
        f"{', '.join(substitutes) if substitutes else 'None found'}.\n"
        "Provide a concise response (less than 100 words) with recommendations. "
        "Always include a disclaimer advising the user to consult a doctor before using any substitutes."
    )

    response = openai.chat.completions.create(
        model="gpt-4o-mini-2024-07-18",
        max_tokens=150,  # Adjust max_tokens as needed to limit the response length
        messages=[
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# AI-generated response for side effects
def generate_side_effects_response(medicine_name, side_effects):
    prompt = (
        f"User asked about side effects of {medicine_name}. The known side effects are: "
        f"{', '.join(side_effects) if side_effects else 'None found'}.\n"
        "Provide a concise response (less than 100 words) with a disclaimer that the user should consult a doctor."
    )

    response = openai.chat.completions.create(
        model="gpt-4o-mini-2024-07-18",
        max_tokens=150,
        messages=[
            {"role": "system", "content": "You are a medical assistant providing information on medicine side effects."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# API to start chat with options
@app.route("/start_chat", methods=["GET"])
def start_chat():
    return jsonify({
        "message": "Hello! How may I assist you?",
        "options": [
            {"text": "Find Medicine Substitute", "value": "substitute"},
            {"text": "Find Doctor Specialist", "value": "specialist"},
            {"text": "Check Side Effects", "value": "side_effects"}  # Added new button
        ]
    })

# API to get specialist recommendation
@app.route("/get_specialist", methods=["GET"])
def get_specialist():
    symptom_or_disease = request.args.get("query")
    if not symptom_or_disease:
        return jsonify({"error": "Please provide a symptom or disease."}), 400

    specialist = get_specialist_recommendation(symptom_or_disease)

    return jsonify({
        "query": symptom_or_disease,
        "specialist": specialist
    })

# API to get matching medicines
@app.route("/search_medicines", methods=["GET"])
def search_medicines():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Please provide a search term."}), 400

    matching_meds = find_matching_medicines(query)
    return jsonify({"matching_medicines": matching_meds if matching_meds else []})

# API to get substitutes for a selected medicine
@app.route("/get_substitutes", methods=["GET"])
def get_medicine_info():
    medicine_name = request.args.get("medicine")
    if not medicine_name:
        return jsonify({"error": "Please provide a medicine name."}), 400

    substitutes = get_substitutes(medicine_name)
    ai_response = generate_ai_response(medicine_name, substitutes)  

    return jsonify({
        "medicine": medicine_name,
        "substitutes": substitutes if substitutes else [],
        "ai_response": ai_response 
    })

# API to check side effects
@app.route("/get_side_effects", methods=["GET"])
def get_side_effects_api():
    medicine_name = request.args.get("medicine")
    if not medicine_name:
        return jsonify({"error": "Please provide a medicine name."}), 400

    # Find the best match for the medicine name
    matched_meds = find_matching_medicines(medicine_name)
    if not matched_meds:
        return jsonify({"error": "No matching medicine found."}), 404

    # Use the first matched medicine to fetch side effects
    best_match = matched_meds[0]
    side_effects = get_side_effects(best_match)
    ai_response = generate_side_effects_response(best_match, side_effects)

    return jsonify({
        "medicine": best_match,
        "side_effects": side_effects if side_effects else [],
        "ai_response": ai_response
    })

# Route to load chatbot UI
@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
