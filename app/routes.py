from flask import render_template, request, redirect, url_for, flash
from .database import db
from .models import Product
from flask import Blueprint

routes_blueprint = Blueprint('routes_blueprint', __name__)



@routes_blueprint.route('/')
def index():
    try:
        # Fetch the first three products based on their ID
        featured_products = Product.query.order_by(Product.id).limit(3).all()
        return render_template('index.html', featured_products=featured_products)
    except Exception as e:
        print(f"An error occurred: {e}")
        return "An error occurred while trying to fetch featured products. Please try again later.", 500


@routes_blueprint.route('/products')
def all_products():
    try:
        # Fetch all products
        all_products = Product.query.order_by(Product.id).all()
        return render_template('products.html', products=all_products)
    except Exception as e:
        print(f"An error occurred: {e}")
        return "An error occurred while trying to fetch all products. Please try again later.", 500
    

@routes_blueprint.route('/product/<int:product_id>')
def product_details(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        return render_template('product_details.html', product=product)
    except Exception as e:
        print(f"An error occurred: {e}")
        return "An error occurred while trying to fetch product details. Please try again later.", 500




# @app.route('/users')
# def list_users():
#     users = User.query.all()
#     return render_template('users.html', users=users)

# @app.route('/user/<int:user_id>')
# def view_user(user_id):
#     user = User.query.get_or_404(user_id)
#     return render_template('user_details.html', user=user)

# @app.route('/user/<int:user_id>/edit', methods=['GET', 'POST'])
# def edit_user(user_id):
#     user = User.query.get_or_404(user_id)
#     if request.method == 'POST':
#         # Handle form submission (update user data)
#         user.username = request.form.get('username')
#         user.password = request.form.get('password')
#         user.role = request.form.get('role')
#         db.session.commit()
#         flash('User updated successfully!', 'success')
#         return redirect(url_for('view_user', user_id=user.id))
#     return render_template('edit_user.html', user=user)

# @app.route('/user/<int:user_id>/delete', methods=['POST'])
# def delete_user(user_id):
#     user = User.query.get_or_404(user_id)
#     db.session.delete(user)
#     db.session.commit()
#     flash('User deleted successfully!', 'success')
#     return redirect(url_for('list_users'))
