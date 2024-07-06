from flask_admin import Admin
from flask_login import current_user
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Product, Order, OrderItems


# Secure model view
class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == 'admin'

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
