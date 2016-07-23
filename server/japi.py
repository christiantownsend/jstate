from flask import Blueprint, render_template, request
from conv import create_image, do, get_url

import json, os
import datastore as ds

api = Blueprint('api', __name__, template_folder='templates', static_folder='static')

from jstate import check_login, session, test_check

trans = str.maketrans('0123456789abcdefghijklmnopqrstuvwxyz ', '0123456789abcdefghijklmnopqrstuvwxyz-', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\t\n\r\x0b\x0c')

main_path = os.path.join(api.static_folder)

@api.route('/login', methods=['POST'])
def login():
    """
    URL: www.example/api/login
    METHOD: POST
    POST DATA:
        'name' : user's name
        'password' : password
    """
    data = request.get_json()
    name = data['name']
    password = data['password']
    user = ds.get_user(name)
    if user == None:
        return 'no-user'
    if user.check_password(password):
        session['logged_in'] = 'true'
        session['ip'] = request.remote_addr
        return 'logged in'
    else:
        return 'name-pass-incorrect'

@api.route('/logged')
def logged():
    """
    Returns true or false on whether the user is logged in
    """
    try:
        if session['logged_in'] == 'true':
            return 'true'
        else:
            return 'false'
    except:
        return 'false'

@api.route('/logout')
def logout():
    """
    Sets cookie data to logged_in = 'false'
    """
    session['logged_in'] = 'false'
    return 'logged-out'


@api.route('/user', methods=['POST'])
@check_login
@do
def new_user():
    """
    User must be logged in
    Takes two values, name and password
    """
    name = request.form['name']
    password = request.form['password']
    if ds.create_user(name, password) == False:
        return 'exists'
    return 'true'

@api.route('/user', methods=['DELETE'])
@check_login
@do
def delete_user():
    """
    User must be logged in
    Takes two values, name and password
    """
    name = request.form['name']
    password = request.form['password']
    if ds.delete_user(name, password) == False:
        return 'no-user'
    return 'true'

@api.route('/user', methods=['PUT'])
@check_login
@do
def update_password():
    """
    User must be logged in
    Takes three values, name and old_pass and new_pass
    """
    name = request.form['name']
    old_pass = request.form['old_pass']
    new_pass = request.form['new_pass']

    user = ds.get_user(name)

    if user.check_password(old_pass):
        user.hash = user.store_hash(new_pass)
        ds.commit()

    return 'true'



@api.route('/main')
def main():
    """
    Returns a JSON list of dicts with title, url, and meta information
    """
    out = ds.page_list()
    out = [i.to_dict() for i in out if i != None]
    return json.dumps(out)

@api.route('/post/<url>', methods=['PUT'])
@check_login
def update_post(url):
    data = request.get_json()

    if data['title'] == '':
        return 'false'

    out = ds.update_document(url, data)
    return out


@api.route('/post/<url>/<int:bool>', methods=['GET'])
def get_post(url, bool):

    return json.dumps(ds.get_by_url(url, bool))

@api.route('/post', methods=['POST'])
@check_login
def create_post():
    data = request.get_json(force=True, silent=True)
    print(data)

    try:
        if data['title'] == '':
            return 'title-blank'
    except:
        return 'unknown-error'

    if ds.create_document(data['title'], data['content'], data['meta']) == False:
        return 'in-use'
    return get_url(data['title'])

@api.route('/post/<url>', methods=['DELETE'])
@check_login
def delete_post(url):
    ds.delete_document(url)
    return 'true'

@api.route('/get-urls')
def get_urls():
    urls = []
    print(ds.page_list())
    for i in ds.page_list():
        if i != None:
            urls.append(i.url)
    return json.dumps(urls)

@api.route('/upload-image', methods=['POST'])
@check_login
@do
def upload_image():

    filename = request.form['filename']
    data = request.form['data']

    return create_image(filename, data, main_path)

@api.route('/viewrequest', methods=['POST'])
def viewrequest():
    return json.dumps([{i: request.form[i]} for i in request.form.keys()])

"""
TODO:
-get all urls
-delete url
-change password
-create post
-new user
-delete user
-image upload
hide post
publish post
"""
