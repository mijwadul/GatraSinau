from app.extensions import db

class School(db.Model):
    __tablename__ = 'school'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    
    # Relationship to users
    users = db.relationship('User', back_populates='school')

    def __repr__(self):
        return f'<School {self.name}>'