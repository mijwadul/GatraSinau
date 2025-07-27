import click
from flask.cli import with_appcontext
from .extensions import db
from .models import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

@click.command('create-developer')
@with_appcontext
@click.argument('email')
@click.argument('username')
@click.argument('password')
def create_developer_command(email, username, password):
    """Creates a new user with the Developer role."""
    if User.query.filter((User.email == email) | (User.username == username)).first():
        click.echo('Error: A user with that email or username already exists.')
        return

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    developer = User(
        email=email,
        username=username,
        password_hash=hashed_password,
        role='Developer'
    )

    db.session.add(developer)
    db.session.commit()

    click.echo(f'Developer account for "{username}" created successfully.')

def init_app(app):
    # We need to initialize bcrypt here as well
    bcrypt.init_app(app)
    app.cli.add_command(create_developer_command)