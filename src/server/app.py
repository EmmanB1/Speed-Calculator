from flask import Flask
from directions import getDirection
from datetime import datetime
from pprint import pprint
from dateutil import parser

app = Flask(__name__)
print(__name__)
@app.route("/")
def hello():
    return "Welcome to the GeoSpeed server!"
# two options: (1) future time inputs and (2) current time input
    # (1)
    # Walking: straightforward (Physics problem (d*t = v))
    # Transit (Bus): we want to track how fast a person needs to be make the bus at a specific time
    # AND tell the time the individual will get there 
    # Cycling (Bike) - similar to walking: Calculate how fast the person needs to be to get there
    # Driving (Car) - similar to Cycling: Calculate the **average** speed required to get there by given time
@app.route("/create_route/<start>/<end>/<transport>")
@app.route("/create_route/<start>/<end>/<transport>/<departure>")
def navigation(start, end, transport="walking", departure='None', unit="imperial"):
    # if user input is added
    if departure == 'None':
        departure = datetime.now()
    else: # use parse tool to auto-convert user input to datetime
        departure = parser.parse(departure)
    print(start)
    print(end)
    print(departure)
    # remove spaces
    start = start.replace('%', ' ')

    # transport: calculate how fast we need to get from Point A to Point B via different circumstances
   
    # Provide a response for each calculation

    # call the api
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
# (2) 
    # Walking: straightforward (Physics problem (d*t = v))
    # Transit (Bus): we want to track how fast a person needs to be make the bus at current moment
    # AND tell the time the individual will get there 
    # Cycling (Bike) - similar to walking: Calculate how fast the person needs to be to get there at that moment
    # Driving (Car) - similar to Cycling: Calculate the **average** speed required to get there at that moment
    
# calculate recommended speed
def calVelocity(dist, time):
    return dist * time

def walkResp(speed, dist, time):
    return "Time to run"
def bikeResp(speed, dist, time):
    return "Time to run"
def carResp(speed, dist, time):
    return "Seems reasonable..."
def transitResp(exp_time, act_time):
    # https://stackoverflow.com/questions/5259882/subtract-two-times-in-python
    return "You might have to run"