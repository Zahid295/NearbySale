import os

from flask import Flask
from flask_migrate import Migrate
from dotenv import load_dotenv

from .extensions import login_manager
from .database import db
from .admin import init_admin

load_dotenv()


def create_app():
    app = Flask(__name__)
    database_url = os.getenv('DATABASE_URL')
    is_heroku = bool(os.getenv('DYNO'))

    if not database_url:
        if is_heroku:
            raise RuntimeError('DATABASE_URL must be configured for Heroku.')
        database_url = 'sqlite:///nearby_sale.db'
    elif database_url.startswith(('postgres://', 'postgresql://')):
        database_url = 'postgresql+psycopg2://' + database_url.split('://', 1)[1]

    secret_key = os.getenv('SECRET_KEY')
    if not secret_key:
        if is_heroku:
            raise RuntimeError('SECRET_KEY must be configured for Heroku.')
        secret_key = os.urandom(32)

    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = secret_key

    db.init_app(app)
    Migrate(app, db)

    login_manager.init_app(app)
    
    
    init_admin(app)

    from .routes import routes_blueprint

    app.register_blueprint(routes_blueprint)

    return app
