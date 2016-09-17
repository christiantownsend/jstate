from flask import Flask, render_template, session, redirect, url_for, request
import sqlalchemy, base64, json, os

from functools import wraps
import config as conf

app = Flask(__name__)

main_path = os.path.abspath(os.path.join(app.static_folder, '..\\'))

if 'mainpath.py' not in os.listdir(main_path):
    out_path = os.path.join(main_path, 'mainpath.py')
    with open(out_path, 'w') as f:

        f.write('main_path = r"{}"'.format(main_path))


from database import init_db
from models import Document
import datastore as ds


def check_login(page):

    @wraps(page)
    def wrapper(*args, **kwds):

        try:
            print(session)
            if session['logged_in'] == 'true' and session['ip'] == request.remote_addr:

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

            return page(*args, **kwds)
        else:
            return 'false', 401


    return wrapper


from japi import api
from page import page
from routes import r

app.secret_key= os.urandom(36)

app.register_blueprint(api, url_prefix='/api')

app.register_blueprint(page, url_prefix='/page')







if conf.catch_all:
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return render_template('index.html')
else:
    app.register_blueprint(r, url_prefix='')



if __name__ == '__main__':



    init_db()

    if ds.get_user('admin') == None:
        ds.create_user('admin', 'admin')



    app.run(debug=True)

