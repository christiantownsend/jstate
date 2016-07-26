
from database import init_db
from database import session
from models import Document, User
import datastore as ds, json
init_db()


case = 3

if case == 0:

    ex = ['hello', 'world', 'and', 'all', 'who', 'inhabit', 'it']

    for i in ex:
        ds.create_document(i, {'content': i[::-1]}, {'meta': i + i[::-1]}, i)


elif case == 1:

    print(Document.query.filter(Document.creator == 'me').first())


elif case == 2:

    print(Document.query.all())

elif case == 3:
    print(ds.get_by_creator('hello'))