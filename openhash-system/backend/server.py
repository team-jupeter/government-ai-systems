from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "openhash-system"}), 200

@app.route('/stats', methods=['GET'])
def stats():
    return jsonify({
        "success": True,
        "tps": "424만+",
        "nodes": "5,200만+",
        "energy_saving": "98.5%",
        "layers": 5
    }), 200

if __name__ == '__main__':
    print("⛓️ 오픈해시 시스템 (포트 5037)")
    app.run(host='0.0.0.0', port=5037, debug=False)
