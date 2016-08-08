from flask import Blueprint, render_template, request, session, redirect
from conv import create_image, do, get_url
import os
import datastore as ds

r = Blueprint('routes', __name__, template_folder='templates', static_folder='static')


from jstate import check_login, session, test_check
from mainpath import main_path


@r.route('/')
def landing():
	return render_template('landing.html')

@r.route('/post/<url>')
def get_post(url):


	return render_template('post.html', ds=ds, url=url)