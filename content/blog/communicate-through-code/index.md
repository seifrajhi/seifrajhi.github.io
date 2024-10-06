---
id: 62b87a6b15e35cd77d0d0df8
path: "/blog/communicate-through-code/"
date: "2024-08-30 13:06:00"
published: true
title: "Communicate Through Code"
cover: "./jantine-doornbos-HvYy5SEefC8-unsplash.jpg"
excerpt: "Learn to communicate your ideas clearly while coding"
keywords:
  - software engineering
  - python
---

I had been a technical lead for more than 3 years. One of my responsibilities was to make sure that my teams produced quality eCommerce solutions. During code reviews, I frequently saw one particular problem which did a great job at **killing software maintainability**. This problem is better known by the people management area, but, believe me, it's vitally important for software development as well. The problem is called **"poorly communicated intent"**.

## Code Lifecycle

When you write code, there is a problem you want to solve. So you do research and brainstorm possible approaches. You evaluate them and stick to one solution that you finally implement.

This is actually where the hardest part starts.

Your solution becomes **a part of a bigger codebase**. A whole team of several people may maintain it. They will read your code, analyze it and **build on top of it**. They may also **evolve that piece of code** to keep up with **ever-changing requirements**.

At the same time, it's **unlikely** you are around all the time to ask you about your code. You may switch the team or change the company you work at. Perhaps, new members may join your team and they have not heard your cool story on why you had to solve that problem the way you had done.

`video: title: "Be ready to support your code": https://media.giphy.com/media/F7yLXA5fJ5sLC/giphy.mp4`

Being always around is a synchronous communication and it **doesn't scale** well.

In the worse case, when the code owner is not available, you can still review all places that consume the code and make sure your changes will not break them. This rather tedious process significantly slows down the progress of the application development and frequently slips your deadlines.

When you adjust code that you don't understand completely, there is a constant fear that there is a subtle use case which you may miss and which eventually will break. Those situations turn codebase maintenance and evolution into a desperately painful task.

Poorly written code is extremely contingent and over time there will be even more code like that. One day technical debt will make you hate every Monday when you have to return to work.

This is not a way to go.

## Intention in Code

The root of the problem is that people don't always realize that they actually **communicate their intent when they do coding**. Think for a moment. It's called "programing language", hence, it must have something **in common with natural languages**. Just like natural languages are useful for communicating your ideas, programing languages inherit pretty much the same idea, but **language expressions** are slightly different. If so, then each expression exists to convey some information, meaning and intention.

Problems start when you try to **misuse** those expressions. This leads to implementations that are hard to read, understand, maintain and change.

## Complexity

This is how we can get **a complex solution**, but why it's actually complex?

Primarily, there are two sources of complexity:

- **domain complexity** - implementation is complex because the problem it solves is complex (e.g. plane's runway scheduling)
- **accidental complexity** - implementation could be simpler but we have implemented it in an unmaintainable way

Domain complexity is something we can't do much about. We just need to deal with it and there are a few approaches like [domain-driven design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215).

At the same time, accidental complexity is something we **can and should avoid**. Let's take a look at the following real-world example:

```python

# bad code below, don't copy-paste it

def remove_duplicates(clean_tokens: list):
    clean_dict = {}

    for tok in clean_tokens:
        if tok[0].isalnum():
            if tok[0] in clean_dict:
                clean_dict[tok[0]] += tok[2]
            else:
                clean_dict[tok[0]] = tok[2]

    result = list(map(list, clean_dict.items()))

    return result
```

Try to read this function a few times. What are your impressions?

- the function is called `remove_duplicates()` but it seems to omit only non-alpha-numerical values, not duplicated values
- what values are inside `tok[0]` and `tok[2]` items? How many items are there in each `tok` array?
- what's the meaning of `tok[2]` sum for each `tok[0]`?

I can say without doubts that this piece of code is complex and it's hard to understand. However, this piece is not about launching a SpaceX shuttle (hopefully). It does something very simple, but what exactly it does was highly obscured by a poor choice of language expressions. This is what **accidental complexity** really means.

## Communication Tools

I hope that at this point you are already eager to know how to improve your "communicate through code" skills.

There are two main ways to communicate your intent better:

- via programing language expressions and idioms
- via comments

Each of them deserves a detailed view, so let's dive into it.

## Language Expressions

### Python vs PHP

Surprisingly, let's talk about PHP for a second.

I started delving into Python after I had spent quite a few years dealing with PHP.
After looking at Python, my first question was: "Why does Python have so many data structures?". There are lists, tuples, sets, frozen sets, dicts and this are just a few to name.

In the PHP world, there are arrays and associative arrays (counterparts of Python's lists and dicts). That's it. Interestingly, there are PHP's [SPL](https://www.php.net/manual/en/book.spl.php) and [Data Structures](https://www.php.net/manual/en/book.ds.php), but, to be honest, I have hardly ever seen them in use in the wild.

So I was really curious. The understanding has come to me later.

It's all about communication of your intent. Python provides many more expressions, built-in functions and approaches that should be used in specific cases to **offload meaning** that each of them should deliver. Conversely, in PHP people often get arrays **overloaded** in terms of the meaning arrays should convey which makes code harder to grasp.

Let's review a few examples.

### Types and Collections

Python has many data types and a good part of them are covered by syntax sugar to make them easier to use. Remaining data types can be found in the `collections` package.

#### Mutable and Unmutable

**Lists** and **sets** are among the basic data structures that are built-in into Python's syntax.

Lists are **mutable** containers for items. Their items should not be necessarily the same type. Lists may contain duplicates. It's rare to see someone accesses items from the middle of the list. Sets are **mutable** containers with no **duplicates** or **a specific order**.

```python
langs: list[str] = [
    "Python",
    "Golang",
    "PHP",
    "R",
    "Julia",
    "JavaScript",
    "Python"
]

for lang in langs:
    print(lang)

# Outputs:
# Python
# Golang
# PHP
# R
# ...
# Python
```

Lists and sets have their **immutable** counterparts which are **tuples** and **frozen sets**. Tuples and frozen sets cannot be modified after creation. They can be used to say that it doesn't make sense to change them because they represent constants or some well-defined structure where each item has a special meaning like a database row.

Python goes even further and lets you name each item in the tuples via the `NamedTuple` class:

```python
from typing import NamedTuple


class Student(NamedTuple):
    name: str
    score: float


student = Student("Roma", 10.4)

print(student.score)
# 10.4

# equivalent to:
# print(student[1])
# but a way more readable
```

#### Dicts

Dicts are the members of the royal family in Python. The whole Python language is based on them. Essentially, **dicts** are **mutable** mappings of **unique keys** to corresponding values. Dicts are typically iterated over or accesses by keys:

```python
lang_mascots: dict[str, str] = {
    "python": "🐍",
    "rust": "🦀",
    "golang": "🐹",
}

print(lang_mascots["python"])
# 🐍

for lang, mascot in lang_mascots.items():
    print(f"{lang} -> {mascot}")
# python -> 🐍
# rust -> 🦀
# golang -> 🐹
```

Even though dicts have [become ordered recently (remembers order of adding keys)](https://stackoverflow.com/questions/39980323/are-dictionaries-ordered-in-python-3-6), you may still want to consider them unordered and use a whole another `OrderedDict` class as a means of emphasizing that you need key ordering.

You can be even more specific if your values are the same type. The `defaultdict` class will help you to automatically init all non-existing keys:

```python
from collections import defaultdict


PokemonList = list[str]

pokemons_by_owner: dict[str, PokemonList] = {}
pokemons_by_owner_safe: dict[str, PokemonList] = defaultdict(list)  # list is a factory of empty values

pokemons_by_owner["Ash"].append("Pikachu")
# KeyError :(

pokemons_by_owner_safe.append("Pikachu")
# all good, one more pokemon has been added
```

#### Counters

Often we need to count how many times each item occurs in the list or dict or to sum up items' weights. I'm sure we could do that via dicts, but Python has a better way to achieve that via the Counter class:

```python
from collections import Counter


langs: list[str] = [
    "Python",
    "Golang",
    "PHP",
    "Python",
    "Golang",
    "PHP",
    "Python",
    "Fortran",
]

lang_popularity: Counter = Counter(langs)

print(lang_popularity.most_common(3))
# [('Python', 2), ('Golang', 2), ('PHP', 2)]
```

Now let's compare this implementation with a dict-based:

```python
from collections import defaultdict
from typing import Dict, List


langs: list[str] = [
    "Python",
    "Golang",
    "PHP",
    "Python",
    "Golang",
    "PHP",
    "Python",
    "Fortran",
]

counter: dict[str, int] = defaultdict(int)

for lang in langs:
    counter[lang] += 1

most_common = sorted(counter.items(), key=lambda item: item[1], reverse=True)

print(most_common[:3])
# [('Python', 2), ('Golang', 2), ('PHP', 2)]
```

As we can see, the dict-based implementation has much more cognitive burden and it's harder and longer to realize that we were just looking for the three most popular languages.

### Looping

Data structures are not the only way to express your intention in code. Loops are good examples of another abstraction that is commonly used and sometimes misused.

#### For and While loops

The for loop is the most frequently used loop in Python. It helps to iterate through the collection or its range and perform some actions on each item.

The while loop is used less frequently and it's aimed to iterate until some condition holds true and we usually don't know the exact number of iterations to take.

Consequently, we can explain why using the while loop for iterating through a collection bloats our cognitive burden:

```python

# bad code below, don't copy-paste it

pets: list[str] = ["dog", "cat", "parrot"]
i: int  = 0

while i < len(pets):
    print(pets[i])
    i += 1
```

In such cases, we need to pay attention to the condition and analyze how it changes with every iteration. This is a lot to think about when we just want to check every item in collections. The "for" loop hides this complexity and focuses us on the item processing part:

```python
pets: list[str] = ["dog", "cat", "parrot"]

for pet in pets:
    print(pet)
```

#### Comprehensions

Often we need to keep data from collection **unmodified**, but just to change its output format. For example, we may have a plain list of JSON strings and we need to convert them to the list of dicts. In such cases, there are no side effects to the data itself, we just convert **one collection into another**. Python has brilliant constructions called list/dict/set comprehensions that are designed to be helpful here:

```python
raw_orders: list[str] = ["{...}", "{...}", "{...}"]  # each item is a JSON string that contains order information

orders: list[Order] = [Order(raw_order_info) for raw_order_info in raw_orders]
```

However, if there is a need for side effects during enumeration, it's recommended to fallback into good old loops.

### Exceptions and Assertions

Exceptions have a special place in Python. They are used to control code flows and to implement [the EAFP pattern](https://devblogs.microsoft.com/python/idiomatic-python-eafp-versus-lbyl/) (which stands for "it’s easier to ask for forgiveness than permission"). Python code developers spent some time optimizing performance of exception raising. In fact, they are now even using exceptions internally to handle things like [ending the iteration process by raising the StopIteration exception](https://peps.python.org/pep-0234/).

In our case, we can use exceptions in the following way:

```python
from os import PathLike

import yaml


class InvalidConfigFormat(RuntimeError):  # a custom exception
    """
    Occurs when config file is not in the valid YAML format
    """


def get_config(config_path: PathLike) -> dict[str, str]:
    """
    Loads the application configurations
    """
    try:
        return yaml.safe_load(open(config_path, "r"))
    except FileNotFoundError:
        yaml.safe_dump({}, open(config_path, "w"))
        return {}
    except yaml.YAMLError as e:
        raise InvalidConfigFormat(
            f"Oh no, {config_path!r} doesn't seem to be a valid config file: {e!r}"
            "Please, double check the file content"
        ) from e

```

Pay attention to how exceptions helped us to separate different scenarios in the get_config() function:

- the main "success path" case (between try and the first except statements)
- the no config file case (the content of the FileNotFoundError handler)
- the wrong config format case (the YAMLError handler)

That separation improves the readability of the code compared to retrieving some flags or status codes like in the Linux system programing.

With heavy use of exceptions, it becomes important to create a custom one, so it's going to be easier to perform the granular error handling. The snippet above introduces a new InvalidConfigFormat exception that they can be caught by consumer code. It's also a common practice to reraise a custom exception that makes more sense for the concrete application and then connects it with the initial exception via the [raise from](https://docs.python.org/3/tutorial/errors.html#exception-chaining) expression.

Another useful case to know is how to ignore some specific exceptions if you are okay that they can happen:

```python
from contextlib import suppress


with suppress(ImportError):
    # I'm fine with no pandas installed in the project
    import pandas
```

It's also useful to know about `assert` and `AssertionError`s. Usually, you will see assert expression is being used in tests, but that's not the only use. `assert`'s may be also used to [dump some assumptions about the code that has to be true](https://realpython.com/python-assert-statement/) in the 95% of the cases but which may still be violated accidentally during the refactoring or other code adjustments. So having such sanity checks could reduce the ripple effect of the error and help to find the cause quicker:

```python
def get_discount(price: float) -> float:
    assert price > 0, f"Price cannot be less than zero ({price} was given)"

    return price * 0.005
```

In order to let `assert`'s work, you should not catch any `AssertionError` and let them fail as soon as possible in your development flow.

### Decorators

Most likely you have heard about the decorator design pattern that is a part of [the GoF's design patterns](https://en.wikipedia.org/wiki/Design_Patterns). The pattern is all about wrapping a function or a method into a code that will be running before or after the original one, or even replacing the original code under needed conditions. It's a transparent way to extend the code without modifying it.

Python took this idea to the next level. It has [a dedicated syntax to register decorators](https://peps.python.org/pep-0318/) in a declarative way:

```python
import functools
from collections import Callable
from typing import TypeVar, cast, Any


tasks: dict[str, Callable[..., Any]] = {}

T = TypeVar("T", bound=Callable[..., Any])

def register_task(func: T) -> T:
    """
    Registers a task function into the task registry
    """
    tasks[func.__name__] = func

    @functools.wraps(func)  # BTW this is a built-in decorator
    def wrapper(*args, **kwargs):
        # modify behavior of the original function
        return func(*args, **kwargs, decorated=True)

    return cast(T, wrapper)

# Usage of the decorator

@register_task
def sample_task():
    print("Sample task has been executed")
```

To give you a better idea of how decorators are used in the wild, let's go through just a few very common problems that can be solved with decorators:

- register a new item in some registry. Let's say, you want to give an elegant way to extend a list webapp routes that you don't know beforehand. The example above illustrates the "register" pattern you can use to achieve that. Many Python web frameworks use decorators for that purpose like [Flask](https://flask.palletsprojects.com/en/1.0.x/tutorial/layout/), [Bottle](https://bottlepy.org/docs/dev/), [FastAPI](https://fastapi.tiangolo.com/tutorial/first-steps/) and others. Another example is [Python's Socket.io client](https://python-socketio.readthedocs.io/en/latest/intro.html#client-examples) which uses decorators to register handlers to some events. Yet another example is [Celery](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html#application) which uses decorators to register their tasks.
- do caching of some function results without modifying the function code. The built-in `functools` package contains `lru_cache` decorator that can be used to cache the output of any function.
- add some markers to the function for the following processing. Tensorflow, for example, has a [`do_not_generate_docs()`](https://github.com/tensorflow/tensorflow/blob/299cb76dd913e7bb0349a13c1165459dac4ea81e/tensorflow/tools/docs/doc_controls.py#L46) decorator that marks functions that should not be exposed in its documentation.
- mark route as one that requires authorization. [Django](https://docs.djangoproject.com/en/4.0/ref/contrib/admin/#the-staff-member-required-decorator) and many Flask extensions use decorators to mark webapp routes as ones that require authorization.
- parametrize a test function. [Pytest](https://docs.pytest.org/en/6.2.x/example/parametrize.html) uses decorators heavily and one of the use cases is to pass a few test cases to the same test function.
- MANY more...

### Context Managers

Finally, let's review another case where Python has a concise solution.

You have probably noticed that quite a few components in programming require us to do three steps:

- initialization (beginning of a context)
- the actual business logic
- clean up (end of the context)

You can think about working with database, acquiring locks, working with files, mocking something in tests and so on.
Those initialization and cleanup stages create some kind of context where you can perform some business logic.

This pattern is so common that Python has got separate support on the language level to write those things in a readable way. It's called context manager. Here is an example:

```python
from contextlib import contextmanager
import time


@contextmanager
def timer(label: str) -> Generator[None, None, None]:
    """
    Timer Context Manager
    """
    try:
        # initialization
        start = time.perf_counter()
        # business logic part is decoupled from the context management
        yield
    finally:
        # clean up
        end = time.perf_counter()
        print(f"{label}: {end - start:0.4f} seconds")

with timer("factorial"):
    # business logic
    factorial(1e3)
```

Context managers help to decouple business logic from the context creation. That makes the usage of contexts more cleaner without the unnecessary burden that initialization/cleanup code could bring to the code.

Here are just a few examples of using context managers in the wild:

- work with files. Python vanilla [`open()`](https://docs.python.org/3/library/functions.html#open) function is implemented as a context manager.
- create a request context. [HTTPX](https://www.python-httpx.org/async/) uses an async context manager to create a request session.
- mock objects for testing purposes. [Python's mock object library](https://docs.python.org/3/library/unittest.mock.html) uses a context manager to create a context where some object is going to be mocked for the sake of unit testing.
- control over backpropagation. [Tensorflow and Keras](https://keras.io/getting_started/intro_to_keras_for_researchers/) use a context manager to give fine-grained control over DNN backprogation gradients.
- define event emitting scope. I have used context managers to elaborate the scope to which you want to emit Socket.io events in [the socket.io-redis-emitter project](https://github.com/seifrajhi/socket.io-redis-emitter)
- etc.

## Comments

Knowing the full context of the solution will help other contributors to evolve it. Some solutions are suboptimal because the code owner did not know a better way to implement them. So someone can understand the context and refactor the code.

More frequently there are external requirements and conditions that prompt us to write suboptimal code. We need to specify them in order to let everyone know in the team. There is probably no better place for that than a comment near the code it belongs to.

In other situations, we may place a summary of the solutions you considered during the research. This may save a lot of time for other people and open a door for new solutions in the future when someone comes up with even smarter ideas.

In all these cases, **comments are a great tool to convey your intention**. They serve best when you specify:

- **why** do you need this code
- and **what** it's intended to do

Make sure you **don't describe self-obvious details** that may be easily figured out by reading the code.

`video: title: "Obvious comments looks like this": https://media.giphy.com/media/R2Rn1PLeMUsyTwj7wa/giphy.mp4`

The following example should be a good illustration:

```python
import requests

from somelib import client

def get_books(page: int = 1, count: int = 10) -> List[Book]:
    """
    Retrieve a list of available books
    """
    return client.get_books(page=page, count=count)

def search_books(keywords: str, page: int = 1, count: int = 10) -> List[Book]:
    """
    Search books by keywords
    """
    response = requests.get(
        f"/api/v1/books/search?p={page}&c={count}",
        json={
            "keywords": keywords,
        }
    )

    # process edge cases
    # ...

    return response.json()
```

It's not clear why `search_books()` method doesn't use `somelib.client` for the search request and it falls back to low level `requests` calls. This question will be raised many times. In order to make this piece of code better, we should have left a comment explaining the astonishing part:

```python
def search_books(keywords: str, page: int = 1, count: int = 10) -> List[Book]:
    """
    Search books by keywords

    somelib.client doesn't support search APIs at this point. We had to use requests to access them.
    """

    # ...
```

This little comment answers all our questions and it also provides additional clues on how to refactor it (e.g. looking at release notes of the somelib to find the search method implemented).

Code comments are far from being the only tool to convey your intention, but it's one of the most obvious one. The code itself should be expressive and **language constructions** are your best friends on this way.

## Don't Make Me Read Twice

Finally, how can we identify spots in our codebase that don't communicate their intend well?

One of the [Python's Zens](https://en.wikipedia.org/wiki/Zen_of_Python) is "there should be one and only one way to do things". The obvious and expected approaches should be preferably used to solve problems. The approaches don't surprise you when you read the code. That would reduce the mental burden and significantly improve codebase maintenance. All code pieces that can not be described that way should be on the list of candidates to be refactored or revisited.

This rule from the Python Zen is related to another famous rule which is [the rule of the least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). Your code should not astonish its readers and it should make them read it twice to understand.

In the real life, it may be harder to achieve high brevity of the code. After all, it's all about trade-offs. However, you should always remember about your best friends on this way: language idioms and comments, because using them does take you closer to that goal.

## References

- <a href="https://www.oreilly.com/library/view/robust-python/9781098100650/">Robust Python by Patrick Viafore</a>
