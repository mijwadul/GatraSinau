from flask import Blueprint, jsonify

user_mgmt_bp = Blueprint('user_mgmt_bp', __name__)

@user_mgmt_bp.route('/api/users', methods=['GET'])
def get_users():
    # We will add role-based logic here later
    return jsonify({"message": "User list will be here."})