from flask import Flask
from flask_migrate import Migrate
from .extensions import login_manager
import os 
from .routes import routes_blueprint
from .database import db
from .admin import init_admin


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS') == 'False'
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    db.init_app(app)
    Migrate(app, db)

    login_manager.init_app(app)
    
    
    init_admin(app)

    
    from .routes import routes_blueprint
    app.register_blueprint(routes_blueprint)
   


    return app
          
