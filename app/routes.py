from flask import render_template, request, redirect, url_for, flash
from .database import db
from .models import Product, Order, OrderItems, User
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
    

@routes_blueprint.route('/about')
def about():
    return render_template('about.html')


@routes_blueprint.route('/contact')
def contact():
    return render_template('contact.html')


@routes_blueprint.route('/submit_contact', methods=['POST'])
def submit_contact():

    # Render a template with a thank message
    return render_template('thank_you.html')


@routes_blueprint.route('/cart')
def cart():
    # Fetch the current user's pending order
    pending_order = Order.query.filter_by(user_id=current_user.id, status='Pending').first()
    if pending_order:
        cart_items = OrderItems.query.filter_by(order_id=pending_order.id).all()
        total_price = sum(item.quantity * item.product.price for item in cart_items)
    else:
        cart_items = []
        total_price = 0
    return render_template('cart.html', cart_items=cart_items, total_price=total_price)

# Route for Sign up
from werkzeug.security import generate_password_hash

@routes_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Hash the password for security
        hashed_password = generate_password_hash(password)
        
        # Create a new user instance
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Account created successfully!', 'success')
        return redirect(url_for('routes_blueprint.login'))
    return render_template('signup.html')







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
