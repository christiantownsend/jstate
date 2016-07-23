from flask import Blueprint, render_template, request
from conv import create_image, do, get_url
import os

page = Blueprint('page', __name__, template_folder='templates', static_folder='static')

from jstate import check_login, session, test_check

trans = str.maketrans('0123456789abcdefghijklmnopqrstuvwxyz ', '0123456789abcdefghijklmnopqrstuvwxyz-', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\t\n\r\x0b\x0c')

main_path = os.path.join(page.static_folder)