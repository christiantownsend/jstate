from database import init_db
from database import session
from models import Document, User
from conv import trans

def create_document(title, content, meta, creator):
    """
    Creates a new document
    """
    if Document.query.filter(Document.title == title).first() != None:
        return False

    doc = Document(title, content, meta, creator)



    session.add(doc)
    session.commit()
    return True

def delete_document(url):
    try:
        Document.query.filter(Document.url == url).delete()
        session.commit()
        return 'true'
    except:
        return 'Delete Failed'

def update_document(url, title, content, meta):

    doc = Document.query.filter(Document.url == url).first()
    if doc == None:
        return False

    doc.title = title
    doc.content = content
    doc.meta = meta
    doc.url = title.lower().translate(trans)
    session.commit()
    return doc.url

def pages():
    """
    Generator that yields all numbered entries in the database
    """
    
    num = 1
    rows = 0
    if num == 1:
        rows += Document.query.count()

    while num <= rows:
        while Document.query.get(num) == None:
            rows += 1
            num +=1
        yield Document.query.get(num)
        num += 1

def page_list():
    return list(pages())

def get_by_url(url, content):
    doc = Document.query.filter(Document.url == url).first()

    return doc.to_dict(content)

def create_user(name, password):

    if User.query.filter(User.name == name).first() != None:
        return False

    user = User(name, password)

    session.add(user)
    session.commit()

    return True

def get_user(name):
    user = User.query.filter(User.name == name).first()

    return user

def users():
    """
    Generator that yields all numbered entries in the database
    """

    num = 1
    rows = 0
    if num == 1:
        rows += User.query.count()

    while num <= rows:
        while User.query.get(num) == None:
            rows += 1
            num +=1
        yield User.query.get(num).name
        num += 1

def user_list():
    return list(users())

def delete_user(name, password):
    if User.query.filter(User.name == name).first() == None:
        return False

    q = User.query.filter(User.name == name)
    user = q.first()
    if user.check_password(password):
        q.delete()
        session.commit()
        return True
    else:
        return False

def update_user_password(name, password):
    user = User.query.filter(User.name == name).first()
    if user.check_password(password):
        user.hash = user.store_hash(password)
        return True
    else:
        return False

def commit():
    session.commit()


def test_data():
    for i in range(1, 10):
        create_document(str(i)+'  '+str(i), str(i), {'num': i})


def test_get():
    for i in Document.query.all():
        print(get_by_url(i.url, content=1))


