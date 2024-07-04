from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user, login_user,  logout_user
from . import login_manager
from werkzeug.security import check_password_hash
from datetime import datetime, timezone
from .database import db
from .models import Product, Order, OrderItems, User
from .extensions import login_manager
from flask import Blueprint
from flask import current_app

routes_blueprint = Blueprint('routes_blueprint', __name__)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

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
@login_required
def cart():
    # Fetch the current user's pending order
    pending_order = Order.query.filter_by(user_id=current_user.id, status='Pending').first()
    if pending_order:
        cart_items = OrderItems.query.filter_by(order_id=pending_order.id).all()
        # Ensure that each item has a price before calculating the total
        total_price = sum(item.quantity * item.product.price for item in cart_items if item.product.price is not None)
    else:
        cart_items = []
        total_price = 0

    return render_template('cart.html', cart_items=cart_items, total_price=total_price)


@routes_blueprint.route('/add_to_cart/<int:product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    # Retrieve the quantity from the form, default to 1 if not provided
    quantity = request.form.get('quantity', 1, type=int)
    
    # Fetch the product to add to the cart
    product = Product.query.get_or_404(product_id)
    
    # Check if the user already has a pending order
    pending_order = Order.query.filter_by(user_id=current_user.id, status='Pending').first()
    if not pending_order:
        # Create a new order if no pending order exists
        pending_order = Order(user_id=current_user.id, order_date=datetime.now(timezone.utc), status='Pending')
        db.session.add(pending_order)
        db.session.commit()
    
    # Check if the product is already in the order
    existing_item = OrderItems.query.filter_by(order_id=pending_order.id, product_id=product.id).first()
    if existing_item:
        # Increase the quantity if it's already there
        existing_item.quantity += quantity
    else:
        # Add a new item to the order with the product's price
        new_item = OrderItems(order_id=pending_order.id, product_id=product.id, quantity=quantity, price=product.price)
        db.session.add(new_item)
    
    db.session.commit()
    flash('Product added to cart successfully!', 'success')
    return redirect(url_for('routes_blueprint.cart', product_id=product_id))

@routes_blueprint.route('/update_cart/<int:order_item_id>', methods=['POST'])
def update_cart(order_item_id):
    quantity = request.form.get('quantity', type=int)
    order_item = OrderItems.query.get(order_item_id)
    if order_item and quantity and quantity > 0:
        order_item.quantity = quantity
        db.session.commit()
        flash('Cart updated successfully!', 'success')
    else:
        flash('Invalid quantity specified', 'error')
    return redirect(url_for('routes_blueprint.cart'))


@routes_blueprint.route('/remove_from_cart/<int:order_item_id>')
def remove_from_cart(order_item_id):
    order_item = OrderItems.query.get(order_item_id)
    if order_item:
        db.session.delete(order_item)
        db.session.commit()
        flash('Item removed from cart', 'success')
    else:
        flash('Item not found in cart', 'error')
    return redirect(url_for('routes_blueprint.cart'))


@routes_blueprint.route('/checkout', methods=['GET', 'POST'])
@login_required
def checkout():
    # Fetch the current user's pending order
    pending_order = Order.query.filter_by(user_id=current_user.id, status='Pending').first()

    if request.method == 'POST':
        if pending_order:
            # Update order status to 'Completed' or similar
            pending_order.status = 'Completed'
            db.session.commit()
            flash('Checkout successful. Thank you for your order!', 'success')
            return redirect(url_for('routes_blueprint.confirm_order', order_id=pending_order.id))
        else:
            flash('No items in cart to checkout', 'error')
            return redirect(url_for('routes_blueprint.cart'))
    else:
        # For a GET request, render the checkout page with the order_id
        if pending_order:
            return render_template('checkout.html', order_id=pending_order.id)
        else:
            flash('No items in cart to checkout', 'error')
            return redirect(url_for('routes_blueprint.cart'))

    # If there's no pending order, render the checkout page without an order_id
    return render_template('checkout.html')


@routes_blueprint.route('/confirm_order/<int:order_id>', methods=['POST'])
@login_required
def confirm_order(order_id):
    # Simulate form data validation
    full_name = request.form.get('full_name')
    address = request.form.get('address')
    city = request.form.get('city')
    zip_code = request.form.get('zip_code')
    card_number = request.form.get('card_number')
    card_expiry = request.form.get('card_expiry')
    card_cvc = request.form.get('card_cvc')

    # Basic validation checks
    if not (full_name and address and city and zip_code and card_number and card_expiry and card_cvc):
        flash('Please fill in all required fields.', 'error')
        return redirect(url_for('routes_blueprint.checkout'))

    # Simulate payment processing
    # In a real application, you would integrate with a payment gateway here
    payment_successful = True  # Mock payment success

    try:
        if payment_successful:
            # Fetch the user's pending order
            pending_order = Order.query.filter_by(user_id=current_user.id, status='Pending').first()
            if pending_order:
                # Calculate the total price of the order
                total_price = sum(item.quantity * item.price for item in pending_order.order_items)
                # Update the order status to 'Completed'
                pending_order.status = 'Completed'
                db.session.commit()
                flash('Your order has been placed successfully!', 'success')
                # Redirect to an order confirmation page
                return render_template('confirm_order.html', order=pending_order, total_price=total_price)
            else:
                flash('There was an error processing your order.', 'error')
                return redirect(url_for('routes_blueprint.cart'))
        else:
            flash('Payment failed. Please try again.', 'error')
            return redirect(url_for('routes_blueprint.checkout'))
    except Exception as e:
        db.session.rollback()
        flash('An unexpected error occurred. Please try again.', 'error')
        print(e)  # For debugging purposes
        return redirect(url_for('routes_blueprint.checkout'))
    

@routes_blueprint.route('/order_history')
@login_required
def order_history():
    try:
        # Fetch all orders for the current user
        orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.order_date.desc()).all()
        return render_template('order_history.html', orders=orders)
    except Exception as e:
        current_app.logger.error(f'Error fetching order history for user {current_user.id}: {e}')
        flash('An error occurred while retrieving your order history. Please try again later.', 'error')
        return redirect(url_for('routes_blueprint.index'))  # Redirect to a safe page
    

@routes_blueprint.route('/track_order/<int:order_id>')
@login_required
def track_order(order_id):
    try:
        # Fetch the specific order
        order = Order.query.get_or_404(order_id)
        # Ensure the order belongs to the current user
        if order.user_id != current_user.id:
            flash('You do not have permission to view this order.', 'error')
            return redirect(url_for('routes_blueprint.order_history'))
        return render_template('track_order.html', order=order)
    except Exception as e:
        current_app.logger.error(f'Error tracking order {order_id} for user {current_user.id}: {e}')
        flash('An error occurred while trying to track the order. Please try again later.', 'error')
        return redirect(url_for('routes_blueprint.order_history'))  # Redirect to the order history page



# Route for Sign up
from werkzeug.security import generate_password_hash

@routes_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Default role 'user'
        role = 'user'
        
        # Hash the password for security
        hashed_password = generate_password_hash(password)
        
        # Create a new user instance with the role
        new_user = User(username=username, password=hashed_password, role=role)
        db.session.add(new_user)
        try:
            db.session.commit()
            flash('Account created successfully!', 'success')
            return redirect(url_for('routes_blueprint.login'))
        except Exception as e:
            db.session.rollback()
            flash('Error creating account. Please try again.', 'error')
            print(e)  # For debugging purposes
    return render_template('signup.html')



@routes_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password, password):
            # Verify if user exists and the password is correct
            login_user(user)
            flash('Logged in successfully.', 'success')
            return redirect(url_for('routes_blueprint.index'))
        else:
            flash('Invalid username or password.', 'error')
    return render_template('login.html')


@routes_blueprint.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('routes_blueprint.index'))








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
