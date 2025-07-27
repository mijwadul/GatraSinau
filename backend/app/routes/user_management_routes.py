from flask import Blueprint, jsonify, request
from app.extensions import db, bcrypt
from app.models import User, School
from app.utils.decorators import token_required

user_mgmt_bp = Blueprint('user_mgmt_bp', __name__)

@user_mgmt_bp.route('/api/users', methods=['GET'])
@token_required
def get_users(current_user):
    """Get a list of users based on the current user's role."""
    if current_user.role == 'Developer':
        users = User.query.all()
    elif current_user.role == 'School Admin':
        if not current_user.school_id:
            # An admin must be assigned to a school to see users
            return jsonify([{"id": current_user.id, "username": current_user.username, "email": current_user.email, "role": current_user.role}])
        # Return self + all teachers in the same school
        users = User.query.filter(
            (User.id == current_user.id) | 
            ((User.school_id == current_user.school_id) & (User.role == 'Teacher'))
        ).all()
    else: # Teacher role
        return jsonify({"error": "You do not have permission to access this resource."}), 403

    user_list = [{"id": u.id, "username": u.username, "email": u.email, "role": u.role} for u in users]
    return jsonify(user_list)

@user_mgmt_bp.route('/api/users', methods=['POST'])
@token_required
def create_user(current_user):
    """Create a new user."""
    if current_user.role not in ['Developer', 'School Admin']:
        return jsonify({"error": "You do not have permission to perform this action."}), 403
    
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('username') or not data.get('role'):
        return jsonify({"error": "Username, email, password, and role are required."}), 400

    if User.query.filter((User.email == data['email']) | (User.username == data['username'])).first():
        return jsonify({"error": "User with this email or username already exists."}), 409

    if current_user.role == 'School Admin' and data['role'] != 'Teacher':
        return jsonify({"error": "Admins can only create Teacher accounts."}), 403

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_password,
        role=data['role']
    )

    if current_user.role == 'School Admin':
        new_user.school_id = current_user.school_id
    elif data.get('school_id'):
        new_user.school_id = data.get('school_id')

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully."}), 201