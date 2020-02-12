import webbrowser
import bs4
import requests
import sys
import pprint
import pyperclip
import copy
import random
import re
import os
import shelve
shelve.open()
shelve['cats'] = cats
shelve.close()
os.path.join()
re.compile()
random.randint()
copy.copy()
copy.deepcopy()
pyperclip.copy()
pyperclip.paste()
pprint.pprint()
pprint.pformat()
sys.argv5
sys.exit()
type()


res = requests.get('http://localhost:8989/index.html')
res.raise_for_status()
playFile = open('myText.txt', 'wb')
for chunk in res.iter_content(1000):
    playFile.write(chunk)
playFile.close()


keyWord = sys.argv[1]
res = requests.get('http://localhost:8989/index.html?key='+keyWord)
# res.raise_for_status()
soup = bs4.BeautifulSoup(res.text)
linkElems = soup.select('.masonry a')
numOpen = min(5, len(linkElems))
for i in range(numOpen):
    webbrowser.open('http://localhost:8989/index.html')


def power(x, *, n=2):  # 关键字参数
    s = 1
    while n > 0:
        n -= 1
        s *= x
    return s


def add(*numbers):  # 可变参数
    for i in numbers:
        print(i)


nums = [1, 2, 3]
add(*nums)  # Python允许你在list或tuple前面加一个*号，把list或tuple的元素变成可变参数传进去


def person(name, age, **kw):
    print('name-->', name)
    print('age-->', age)
    print('other-->', kw)


person('Bob', 38, city='Beijing')
person('Bob', 38, gender="M", job="Engineer")
extra = {'city': 'Beijing', 'job': 'Engineer'}
# **extra表示把extra这个dict的所有key-value用关键字参数传入到函数的**kw参数，kw将获得一个dict，注意kw获得的dict是extra的一份拷贝，对kw的改动不会影响到函数外的extra。
person('Bob', 38, **extra)


def person(name, age, *, city, job):  # 和关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数
    pass


def person(name, *age, city, job):  # 如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了
    pass


def f1(a, b, c=0, *args, **kw):
    pass


def f2(a, b, c=0, *, d, **kw):
    pass
# 对于任意函数，都可以通过类似func(*args, **kw)的形式调用它，无论它的参数是如何定义的


print(list(range(100)))  # 100的序列
nums = [1, 2, 3, 4, 5, 6, 7]
res = nums[::2]
print(res)

# 列表生成式
l = [v for d in range(1, 11)]

l1 = [x for x in range(10)]
print(l1)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
l2 = [m+n for m in 'ABC' for n in 'XYZ']
print(l2)  # ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
[x * x for x in range(1, 11) if x % 2 == 0]

d = {'x': 'A', 'y': 'B', 'z': 'C'}
[k + '=' + v for k, v in d.items()]
['y=B', 'x=A', 'z=C']

g = (x*x for x in range(10))  # 创建生成器
print(next(g))
for n in g:
    print(n)


def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b  # 创建生成器
        a, b = b, a+b
        n = n+1
    return 'done'


fib(5)
# 如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator


class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        self.job = 'Engineer'
        print('%s:%s' % (self.name, self.score))


bart = Student('wangzhi', 100)
bart.print_score()
bart.name = 'ao'
print(bart.job)


class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def get_grade(self):
        if self.score >= 90:
            return "A"
        elif self.score >= 60:
            return "B"
        else:
            return "C"


class Student(object):
    def __init__(self, name, gender):
        self.name = name
        # 如果要让内部属性不被外部访问，可以把属性的名称前加上两个下划线__，在Python中，实例的变量名如果以__开头，就变成了一个私有变量（private），只有内部可以访问，外部不能访问
        # Python解释器对外把__gender变量改成了_Student__gender
        self.__gender = gender

    def get_gender(self):
        return self.__gender

    def set_gender(self, sex):
        if sex in ['male', 'female']:
            self.__gender = sex
        else:
            print('Gender argument is invalid')


class Animal(object):
    def run(self):
        print('Animal is running')


class Dog(Animal):
    def run(self):
        print('Dog is running')


class Cat(Animal):
    pass


dog = Dog()
dog.run()

print(type(Animal))
print(type(dog))
print(isinstance(dog, Dog))
print(isinstance(dog, Animal))


isinstance([1, 2, 3], (lsit, typle))  # True
# 查看当前值的属性或方法
l = dir('ABC')
print(l)


class MyObject(object):
    def __init__(self):
        self.x = 9

    def power(self):
        return slef.x*self.x


obj = MyObject()
getattr(obj, 'x')  # 9
getattr(obj, 'z', 404)  # 获取属性'z'，如果不存在，返回默认值404
setattr(obj, 'y', 19)
hasattr(obj, 'x')  # True


class Student(object):
    count = 0  # 类的属性
    __slots__ = ('name', 'age')  # 用tuple定义允许绑定的属性名称

    def __init__(self, name):
        self.name = name
        Student.count += 1


bar = Student('wangzhi')
foo = Student('ao')


def sayHello():
    print('Hello')


bar.say = sayHello
bar.say()
foo.say()  # AttributeError
# 使用__slots__要注意，__slots__定义的属性仅对当前类实例起作用，对继承的子类是不起作用的
# 在子类中也定义__slots__，这样，子类实例允许定义的属性就是自身的__slots__加上父类的__slots__


class Student(object):
    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('error')
        if value < 0 or value > 100:
            raise ValueError('error boundary')
        self._score = value


s = Student()
s.score = 60
print(s.score)
s.score = 999  # ValueError: error boundary


class Screen(object):
    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        self._width = value

    @property  # 定义只读属性
    def resolution(self):
        return 786432


class Student(object):
    def __init__(self, name):
        self.location = 'Beijing'
        self.name = name
        self.__job = 'Enginner'

    def __str__(self):
        return 'Student object ( name:%s)' % self.name
    # 两者的区别是__str__()返回用户看到的字符串，而__repr__()返回程序开发者看到的字符串，也就是说，__repr__()是为调试服务的。
    __repr__ = __str__


print(Student('wanghzi'))  # 默认调用 __str__


class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 1

    def __iter__(self):  # 拥有__iter__方法就可以被fo in 迭代，需返回迭代器，具有__next__方法
        return self  # 实例本身就是迭代对象，故返回自己

    def __next__(self):
        self.a, self.b = self.b, self.a+self.b
        if self.a > 100:
            raise StopIteration()
        return self.a

    def __getitem__(self, n):
        a, b = 1, 1
        for x in range(n):
            a, b = b, a+b
        return a

    # 当调用不存在的属性时，比如score，Python解释器会试图调用__getattr__(self, 'score')来尝试获得属性
    def __getattr__(self, attr):
        if attr == 'score':
            return 99
        else:
            raise AttributeError('object has no attribute \'%s\' % attr')


# 为了让Fib类可以被for in迭代，需要实现__iter__ __next__方法，如果要支持按索引取值，需要实现__getitem__,
# __getitem__方法需要注意切片时的情况
for n in Fib():
    # print(n)
    pass

f = Fib()
print(f[3])


class Student(object):
    def __init__(self, name):
        self.name = name
    # 任何类，只需要定义一个__call__()方法，就可以直接对实例进行调用

    def __call__(self):
        print('My name is %s.' % self.name)


s = Student('wangzhi')
s()

print(callable1(Student()))  # True
print(callable2(max)  # True
      print(callable3([1, 2, 3]))  # False


from enum import Enum
Month=Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May',
                    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
for name, member in Month.__members__.items():
print(name, '-->', member, ',', member.value)


from enum import Enum, unique
@unique
class Weekday(Enum):
    Sun=0
    Mon=1
    Tue=2
    Wed=3
    Thu=4
    Fri=5
    Sat=6
day1=Weekday.Mon
print(Weekday.Mon)
print(Weekday.Tue.value)

def fn(self, name='world'):
print('Hello,%s.', % name)


Hello=type('Hello', (object,), dict(hello=fn))
h=Hello()
h.hello()
print(type(Hello))
print(type(h))

n=3
dp=[[3]*n for _ in range(n)]
print(dp)  # [[3, 3, 3], [3, 3, 3], [3, 3, 3]]

a=[2]*2
print(a)  # [2, 2]


list=[36, 5, -12, 9, -21]

sort=sorted(list, key=abs, reverse=True)  # key是个映射函数，reverse表示是否反转
print(sort)

      L=[('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]


      def by_name(t):
      return t[0]

      L2=sorted(L, key=by_name)
      print(L2)


# 闭包函数
def count():
    def f(j):
        def g():
            return j*j
    fs=[]
    for i in range(1, 4):
        fs.append(f(i))
    return fs


f=lambda x: x*x
def f(x): return x*x
print(f(2))
def build(x, y):
    return lambda: x*x+y*y

L=list(filter(lambda n: n % 2 == 1, range(1, 10)))
print(L)  # [1, 3, 5, 7, 9]

import functools


def now(): print('2020-01-09')


print(now.__name__)  # now


def log(func):
# 因为返回的那个wrapper()函数名字就是'wrapper'，所以，需要把原始函数的__name__等属性复制到wrapper()函数中，否则，有些依赖函数签名的代码执行就会出错。
@functools.wraps(func)
def wrapper(*args, **kw):
print('call %s' % func.__name__)
return func(*args, **kw)
return wrapper

@log
def say(): print('say is executing')
say()

import functools
# functools.partial的作用就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数(偏函数)
int2=functools.partial(int, base=2)

import logging

try:
    print('try...')
    r=10/0
except ValueError as e:
    print('ValueError', e)
except ZeroDivisionError as e:
    logging.exception(e)
else:
    print('no error')
finally:
    print('finally')
print('END')

# 调试错误方法：1、print 2、assert 3、logging模块

import logging
logging.basicConfig(level=logging.INFO)

    import unittest


    class TestDict(unittest.TestCase):
    def test_init(self):
        d=Dict(a=1, b='test')
        self.assertEqual(d.a, 1)
        self.assertTrue(isinstance(d, dict))

    def test_key(self):
        d=Dict()
        d['key']='value'
        self.assertEqual(d.key, 'value')

f=open('./text.txt', 'r')
f.read()  # 一次将文件内容读到内存中
f.read(size)  # 每次最多读取size个字节
f.readlines()  # 每次读取一行内容
f.close()

with open('./test.txt', 'r') as f:
    f.read()
    # 这和前面的try ... finally是一样的，但是代码更佳简洁，并且不必调用f.close()方法。
f=open('smile.jpg', 'rb')  # 二进制文件要用rb模式打开
f=open('text.txt', 'r', encoding='gbk', errors='ignore')

from io import StringIO
f=StringIO()
f.write('hello')
f.getvalue()

f=StringIO('Hello!\nHi!\nGoodbye!')
f.readline()

from io import BytesIO
f=BytesIO()
f.write('中文'.encode('utf-8'))
f.getvalue()

from io import BytesIO
    f=BytesIO(b'\xe4\xb8\xad\xe6\x96\x87')
    f.read()
    import os
    print(os.name)  # 操作系统
    print(os.environ)
    print(os.environ.get('PATH'))
