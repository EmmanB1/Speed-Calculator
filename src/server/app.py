from flask import Flask
from directions import getDirection
from datetime import datetime
from pprint import pprint

app = Flask(__name__)
print(__name__)
@app.route("/")
def hello():
    return "Welcome to the GeoSpeed server!"
@app.route("/create_route/<start>/<end>")
def navigation(start, end, transport="walking", departure=datetime.now(), unit="imperial"):
    print(start)
    print(end)
    # remove spaces
    start = start.replace('%', ' ')
    data = getDirection(start, end, transport, departure, unit)
    set_dict = dict({})
    set_dict['distance'] = data[0]['legs'][0]['duration']['text']
    set_dict['duration'] = data[0]['legs'][0]['distance']['text']
    return set_dict
@app.route("/get_direction_test")
def navigation_test():
    data = getDirection("Renaissance Schaumburg Convention Center Hotel", "Topgolf, Schaumburg")
    set_dict = dict({})
    set_dict['distance'] = data[0]['legs'][0]['duration']['text']
    set_dict['duration'] = data[0]['legs'][0]['distance']['text']
    return set_dict
