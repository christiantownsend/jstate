from flask import Blueprint, render_template, request
from conv import create_image, do, get_url
import os

page = Blueprint('page', __name__, template_folder='templates', static_folder='static')

from jstate import check_login, session, test_check
from mainpath import main_path


