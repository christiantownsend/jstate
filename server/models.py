from sqlalchemy import Column, Integer, String
from database import Base
import sqlalchemy.types as types
import json, bcrypt, hmac

trans = str.maketrans('0123456789abcdefghijklmnopqrstuvwxyz ', '0123456789abcdefghijklmnopqrstuvwxyz-', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\t\n\r\x0b\x0c')


class JSON(types.TypeDecorator):

    impl = types.String

    def process_bind_param(self, value, dialect):
        # INTO DATABASE
        if type(value) == type(''):
            return value
        else:
            return json.dumps(value)

    def process_result_value(self, value, dialect):
        # OUT OF DATABASE
        return json.loads(value)


class Document(Base):
    # content structure:
    #
    #
    #
    __tablename__ = 'documents'
    id = Column(Integer, primary_key=True)
    title = Column(String(50), unique=True)
    content = Column(JSON())
    meta = Column(JSON())
    url = Column(String(50), unique=True)
    creator = Column(String(50))

    def __init__(self, title=None, content=None, meta=None, creator=None):
        self.title = title
        self.content = content
        self.meta = meta
        self.url = title.lower().translate(trans)
        self.creator = creator

    def __repr__(self):
        return "<Document {}>".format(self.title)

    def to_dict(self, content=0):
        out = {}
        out['title'] = self.title
        out['url'] = self.url
        if content:
            out['content'] = self.content
        out['meta'] = self.meta
        out['creator'] = self.creator


        return out


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    hash = Column(String)


    def __init__(self, name=None, password=None):
        self.name = name
        self.hash = self.store_hash(password)

    def __repr__(self):
        return "<User {}>".format(self.name)

    def store_hash(self, pw):
        return bcrypt.hashpw(bytes(pw, 'utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        conv = bytes(password, 'utf-8')
        return hmac.compare_digest(bcrypt.hashpw(conv, self.hash), self.hash)
