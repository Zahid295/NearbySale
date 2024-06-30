from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_admin import Admin
from config import SQLALCHEMY_DATABASE_URI
from .routes import routes_blueprint


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # admin = Admin(app, name='nearby-backend', template_mode='bootstrap3')
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    Migrate(app, db)
    
# app = Flask(__name__)
# admin = Admin(app, name='nearby-backend', template_mode='bootstrap3')
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)
    from . import routes
    app.register_blueprint(routes_blueprint)
   


    return app     
          
