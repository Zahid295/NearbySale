# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from app import create_app
# # from . import app
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)


# # if __name__ == '__main__':
# #     app.run(debug=True)

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = " "
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)
# migrate = Migrate(app, db) 

# app = create_app()

# if __name__ == '__main__':
#     app.run(debug=True)
