import base64, os
from functools import wraps

trans = str.maketrans('0123456789abcdefghijklmnopqrstuvwxyz .', '0123456789abcdefghijklmnopqrstuvwxyz-.', '!"#$%&\'()*+,-/:;<=>?@[\\]^_`{|}~\t\n\r\x0b\x0c')

def do(page):

    @wraps(page)
    def wrapper(*args, **kwds):

        try:
            return page(*args, **kwds)
        except:
            return 'false'


    return wrapper





def get_name(path, name, num=1, new_name=None):

    files = os.listdir(path)



    cmp_name = name if new_name == None else new_name




    if cmp_name in files:
        new_name =  '({})-'.format(num) + name
        return get_name(path, name, num+1, new_name)
    else:
        return cmp_name


def create_image(filename, b64s, path):

    meta, img = b64s.split(',')
    _none, data = meta.split('/')
    filetype, _none = data.split(';')

    name = "{}.{}".format(filename, filetype)
    name = name.lower().translate(trans)

    name = get_name(path, name)

    out = name

    name = os.path.join(path, name)

    with open(name, 'wb') as f:
        b64 = base64.decodebytes(bytes(img, encoding="utf-8"))
        f.write(b64)



    return out
