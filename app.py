from flask import Flask

# Instance app
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, Flask World!'

if __name__ == '__main__':
    app.run(debug=True)