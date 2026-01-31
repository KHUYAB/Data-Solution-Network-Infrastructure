from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "netconnect-secret-key"  # required for session

# Demo user (static / hard-coded)
DEMO_USER = {
    "email": "admin@netconnect.com",
    "password": "admin123"
}

@app.route('/')
def home():
    return render_template('index.html', title='Home')

@app.route('/services')
def services():
    return render_template('services.html', title='Services')

@app.route('/about')
def about():
    return render_template('about.html', title='About Us')

@app.route('/contact')
def contact():
    return render_template('contact.html', title='Contact')

# LOGIN
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        if email == DEMO_USER['email'] and password == DEMO_USER['password']:
            session['user'] = email
            return redirect(url_for('home'))
        else:
            error = "Invalid email or password"

    return render_template('login.html', title='Login', error=error)

# LOGOUT
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

# REGISTER (STATIC LANG)
@app.route('/register')
def register():
    return render_template('register.html', title='Register')

# Errors
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
