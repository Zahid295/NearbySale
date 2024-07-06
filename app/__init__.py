from flask import Flask
from flask_migrate import Migrate
from .extensions import login_manager
from config import SQLALCHEMY_DATABASE_URI, SECRET_KEY 
from .routes import routes_blueprint
from .database import db


def create_app():
    app = Flask(__name__)
    # admin = Admin(app, name='nearby-backend', template_mode='bootstrap3')
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = SECRET_KEY

    db.init_app(app)
    Migrate(app, db)

    login_manager.init_app(app)
    
# app = Flask(__name__)
# admin = Admin(app, name='nearby-backend', template_mode='bootstrap3')
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)
    from .routes import routes_blueprint
    app.register_blueprint(routes_blueprint)
   


    return app
          
