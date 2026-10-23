# NearbySale - An E-commerce Shopping Platform

NearbySale is a full-stack e-commerce web application built with Flask, PostgreSQL, SQLAlchemy, and Jinja templates. The platform allows users to browse products, add items to their cart, complete purchases, and manage their orders. It also includes an admin interface for managing products and store operations.

The application is designed to provide a smooth online shopping experience for both new and returning users, while giving administrators the functionality needed to manage the store efficiently.

## User Goals and Stories

### User Goals

As a user, I want to:

- Browse the website easily and intuitively
- View products and understand their details clearly
- Search and explore items by category or interest
- Create an account or log in safely
- Add products to a cart
- Manage cart items before checkout
- Complete a purchase with confidence
- View my order history and track my orders
- Contact the store if I need help or support

### Business Owner Goals

As the website business owner, I want to:

- Present products in a clear and attractive format
- Allow customers to register and log in
- Make the shopping process simple and hassle-free
- Allow customers to add, update, and remove items from the cart
- Support secure checkout and order completion
- Give users access to order history and order tracking
- Manage products and store content through an admin panel
- Provide contact information and support for customers

### User Stories

#### As a user:

- I want to visit the website and understand its purpose immediately
- I want to explore products without confusion
- I want to read product details before buying
- I want to add products to my cart with ease
- I want to update the quantity or remove items from my cart
- I want to complete my purchase through a straightforward checkout process
- I want to track my orders after purchase
- I want to access my order history when needed
- I want to have a smooth and enjoyable shopping experience
- I want to return to the site for future purchases

#### As a Website Business Owner

- As a site owner, I want to display products clearly and professionally
- As a site owner, I want users to easily browse and shop online
- As a site owner, I want customers to create accounts for a personalized experience
- As a site owner, I want users to manage their carts and orders conveniently
- As a site owner, I want checkout to be simple and reliable
- As a site owner, I want admins to manage products and orders effectively
- As a site owner, I want the site to feel modern, readable, and responsive on different devices

## Design

### User Experience and Layout

NearbySale uses a clean, modern storefront design with a user-friendly layout. The interface focuses on readability, visual hierarchy, and clear call-to-action buttons to guide users from browsing to checkout.

The design aims to deliver a professional e-commerce experience with:

- Clear product presentation
- Simple navigation
- Strong visual contrast
- Responsive layout for laptops, tablets, and mobile devices
- Consistent styling across pages

## Development

### Agile Methodology

The project was developed using an iterative and incremental approach, with a focus on building features progressively and improving usability throughout the development lifecycle. The workflow involves breaking the application into functional sections such as user authentication, product browsing, cart management, checkout, and order tracking.

## Technologies Used

- Python: Main backend language for application logic
- Flask: Web framework used to build the application
- Flask-SQLAlchemy: ORM and database management for PostgreSQL
- PostgreSQL: Database used to store application data
- Jinja Templates: Used to render dynamic HTML pages
- HTML: Structure and content of the web pages
- CSS: Styling and responsive layout
- Flask-Login: User authentication and session management
- Flask-Admin: Admin panel for application management
- GitHub: Version control and repository hosting
- Git: Source control system for development
- Heroku: Cloud platform used for deployment
- PEP8: Code formatting and Python style validation

## Features

### Home Page

The Home Page provides customers with a welcoming storefront experience. It presents featured products and highlights the main shopping experience quickly and clearly.

### Product Listing Page

The Product Listing Page displays products in a structured layout, allowing users to browse the available inventory. Each product is presented with relevant details to help users decide what to buy.

### Product Details Page

The Product Details Page gives users information about a single item, including descriptions and product attributes. This page helps users make informed purchasing decisions before adding an item to their cart.

### Cart Page

Users can view all items in their cart, update quantities, and remove unwanted products. The cart page calculates totals to keep the shopping process transparent and easy to follow.

### Checkout Page

The checkout flow allows authenticated users to review and complete their purchase. The ordering process is designed to be straightforward and user-friendly.

### Order History and Tracking

Users can access their purchase history and monitor their orders. This provides a more complete shopping experience and improves trust in the platform.

### Contact Page

The Contact Page gives users a way to reach the business or store owner with questions, concerns, or support requests.

### Authentication Pages

The application includes login and signup pages to support account creation and user access to personalized shopping features.

### Admin Management

The project includes an admin interface to support site administration, allowing store owners to manage products and related operations.

## Deployment

### Pre-Deployment Checklist

Before deploying on Heroku, ensure the following:

- Update requirements.txt with all project dependencies
- Confirm the application entry point is correctly configured
- Set environment variables such as SECRET_KEY and DATABASE_URL
- Provide a valid PostgreSQL connection for production
- Ensure static files and templates are correctly configured
- Check that the app is ready to run in a production environment

### Deploying to Heroku

Follow these steps to deploy NearbySale on Heroku:

1. Create a Heroku account and log in
2. Create a new application in the Heroku dashboard
3. Connect the GitHub repository to the app
4. Choose the correct branch for deployment
5. Add the required environment variables in the app settings
6. Deploy the application
7. Verify the app is running correctly in the live environment

### Forking the Repository

To create a personal copy of the repository:

1. Go to the GitHub repository
2. Click the Fork button in the upper right corner
3. Select your GitHub account as the destination
4. Wait for the fork to be created
5. Clone the fork to your local machine

### Cloning the Repository

To work on the project locally:

1. Open GitHub
2. Navigate to the repository
3. Click the Code button
4. Copy the repository URL
5. Open your terminal or Git Bash
6. Run:
   git clone <repository-url>

### Running the Repository Locally

To run NearbySale locally:

1. Open the project folder in your editor
2. Create and activate a virtual environment
3. Install dependencies:
   pip install -r requirements.txt
4. Set up the required environment variables
5. Configure the database
6. Run the Flask app:
   python run.py

## Credits

### Content and Inspiration

This project was created as a full-stack e-commerce application using Flask and a database-driven backend. The structure and presentation follow the style of practical web development projects designed for learning and portfolio use.