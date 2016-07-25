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
        return 'no-user', 401
    if user.check_password(password):
        session['logged_in'] = 'true'
        session['ip'] = request.remote_addr
        session['name'] = name
        return name
    else:
        return 'name-pass-incorrect', 401

@api.route('/logged')
def logged():
    """
    URL: www.example/api/logged
    METHOD: GET
    RETURN DATA:
        'true' or 'false'
    """
    try:
        if session['logged_in'] == 'true':
            return 'true'
        else:
            return 'false'
    except:
        return 'false'

@api.route('/logout', methods=['POST'])
def logout():
    """
    URL: www.example/api/logout
    METHOD: POST
    PURPOSE:
        Logs user out
    RETURN DATA:

    """
    session['logged_in'] = 'false'
    return 'logged-out'


@api.route('/user', methods=['POST'])
@check_login
@do
def new_user():
    """
    URL: www.example/api/user
    METHOD: POST
    PURPOSE:
        Creates new user if the user is already logged in.
    RETURN DATA:
        Errors on existing user, returns true if successful.
    """
    data = request.get_json()
    name = data['name']
    password = data['password']
    if ds.create_user(name, password) == False:
        return 'exists', 403
    return 'true'

@api.route('/user/delete', methods=['POST'])
@check_login
@do
def delete_user():
    """
    URL: www.example/api/user/delete
    METHOD: POST
    PURPOSE:
        Deletes a given user, must have users name and password.
    RETURN DATA:
        Returns no-user if deleted user doesn't exist, delete-logged if the currently logged in user is deleted, and
        true if it is simply successful.
    """
    data = request.get_json()
    name = data['name']
    password = data['password']



    if ds.delete_user(name, password) == False:
        return 'no-user', 403
    if name == session['name']:
        session['logged_in'] = 'false'
        return 'delete-logged'
    return 'true'

@api.route('/user', methods=['PUT'])
@check_login
@do
def update_password():
    """
    URL: www.example/api/user
    METHOD: PUT
    PURPOSE:
        Changes given users password, takes the name, the old_pass, and the new_pass.
    RETURN DATA:
        Returns true on success.

    """
    data = request.get_json()
    name = data['name']
    old_pass = data['old_pass']
    new_pass = data['new_pass']

    user = ds.get_user(name)

    if user.check_password(old_pass):
        user.hash = user.store_hash(new_pass)
        ds.commit()

    return 'true'



@api.route('/main')
def main():
    """
    URL: www.example/api/main
    METHOD: GET
    PURPOSE:
        Gets the default page set of content.
    RETURN DATA:
        Returns a JSON list that has an object for each post on the site,
        with given title, url, and meta values.
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
            return 'title-blank', 422
    except:
        return 'no-title', 422

    if ds.create_document(data['title'], data['content'], data['meta'], session['name']) == False:
        return 'in-use', 409
    return get_post(get_url(data['title']), 0)

@api.route('/post/<url>', methods=['DELETE'])
@check_login
def delete_post(url):
    ds.delete_document(url)
    return url


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
"""
