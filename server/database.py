from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

#from jstate import main_path

main_path = r'C:\Users\Trase\PycharmProjects\jstate-master\server'

db_path = os.path.abspath(os.path.join(main_path, 'test.db'))


test = r'C:\Users\Trase\PycharmProjects\jstate\test.db'

db = create_engine('sqlite:///{}'.format(db_path), convert_unicode = True)

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=db))

Base = declarative_base()
Base.query = session.query_property()

def init_db():
    import models
    Base.metadata.create_all(bind=db)

