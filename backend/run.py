from flask_cors import CORS
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:3000'])

    from src import main as main_bp
    app.register_blueprint(main_bp)

    return app

app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
