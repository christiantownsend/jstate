from flask import Flask, render_template, session, redirect, url_for, request
import sqlalchemy, base64, json, os
import datastore as ds
from functools import wraps


app = Flask(__name__)

main_path = os.path.abspath(os.path.join(app.static_folder, '..\\'))


def check_login(page):

    @wraps(page)
    def wrapper(*args, **kwds):

        try:
            print(session)
            if session['logged_in'] == 'true' and session['ip'] == request.remote_addr:
                print('test2')
                return page(*args, **kwds)
            else:
                return 'false', 403
        except Exception:
            print(Exception)
            return 'false', 403


    return wrapper

def test_check(page):

    @wraps(page)
    def wrapper(*args, **kwds):


        print(session)
        if session['logged_in'] == 'true':
            print('test2')
            return page(*args, **kwds)
        else:
            return 'false', 401


    return wrapper


from japi import api
from page import page

app.secret_key= os.urandom(36)

app.register_blueprint(api, url_prefix='/api')

app.register_blueprint(page, url_prefix='/page')






@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')




if __name__ == '__main__':
    from database import init_db
    from database import session
    from models import Document
    import datastore as ds
    init_db()

    if ds.get_user('admin') == None:
        ds.create_user('admin', 'admin')



    app.run(debug=True)

