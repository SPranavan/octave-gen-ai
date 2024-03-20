from src.common.conf import read_conf
from src import main
from flask import jsonify, request
import base64
import requests

conf = read_conf()

@main.route("/auth/query_data", methods=["POST"])
def query_data():
    query = request.form["query"]
        
    # Generate Image/Video using API 
        
    response = requests.get('https://picsum.photos/200/308')
     
    llm_output = base64.b64encode(response.content).decode('utf-8')

    return jsonify({ "llm_output": llm_output})
