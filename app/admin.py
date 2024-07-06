from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Product, Order, OrderItems

# Initialize Flask-Admin instance
admin = Admin(name='FurnitureStore', template_mode='bootstrap3')

# Add model views
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Product, db.session))
admin.add_view(ModelView(Order, db.session))
admin.add_view(ModelView(OrderItems, db.session))

def init_admin(app):
    # Function to initialize Flask-Admin with the Flask app
    admin.init_app(app)
