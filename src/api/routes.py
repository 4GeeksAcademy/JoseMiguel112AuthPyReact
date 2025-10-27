"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 404
    
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200


@api.route("/signin", methods=["POST"])
def signin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email y password son requeridos"}), 400

    existing_user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if existing_user is not None:
        return jsonify({"msg": "Usuario ya existe"}), 409

    
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado", "email": new_user.email}), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_private():
    
    try:

        # Obtener el ID del usuario autenticado
        current_user_id = get_jwt_identity()

        # Buscar el usuario en la base de datos
        current_user = User.query.get(current_user_id)
        
        if not current_user:
            return jsonify({"error": "Usuario no encontrado."}), 404


        # Se incluye información adicional para el perfil de usuario privado
        profile_data = current_user.serialize()
        
        
        return jsonify({
            "message":     "Datos de usuario encontrados",
            "current_user": profile_data
        }), 200


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@api.route("/verify-token", methods=["GET"])
@jwt_required()
def verify_token():
    # Devuelve el identity del JWT (aquí será el user.id)
    return jsonify({"user_id": get_jwt_identity()}), 200
