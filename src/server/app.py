from flask import Flask
from directions import getDirection
from datetime import timedelta, datetime, date
from pprint import pprint
from dateutil import parser
import re

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
@app.route("/create_route/<start>/<end>/<transport>/<departure>/")
@app.route("/create_route/<start>/<end>/<transport>/<departure>/<arrival>")
def navigation(start, end, transport="walking", departure='None', arrival='None', unit="imperial"):
    # if user input is added
    if departure == 'None':
        departure = datetime.now()
    else: # use parse tool to auto-convert user input to datetime
        departure = parser.parse(departure)
    if arrival != 'None': # use parse tool to auto-convert user input to datetime
        arrival = parser.parse(arrival)
        
    print(start)
    print(end)
    print(departure)
    print(arrival)
    # remove spaces
    start = start.replace('%', ' ')

    # transport: calculate how fast we need to get from Point A to Point B via different circumstances
   
    # Provide a response for each calculation

    # call the api
    data = getDirection(start, end, transport, departure, unit)
    set_dict = dict({})
    set_dict['distance'] = data[0]['legs'][0]['distance']['text']
    set_dict['duration'] = data[0]['legs'][0]['duration']['text']
    # calculate how fast one needs to be
    # this is for walking, car, and cycling with a DESIRED future time
    if arrival != 'None' and departure != 'None':
        # use regex to to get the convert str time to float seconds
        # get float distance (in mi)
        # \d+h* in regex gets all digits before string
        dist_mi = str_to_dist(re.findall(r'\d+h*', set_dict['distance']))
        
        # calculate time delta to desired time (in sec)
        diff = getTime(arrival, departure)
        velo = str(calVelocity(dist_mi, diff)) + ' mph'
        set_dict['speed'] = velo
    else: # this is for walking, car, and cycling with no preferred future time
        # use regex to to get the convert str time to float seconds
        # get hour
        dist_mi = 0
        time_sec = 0
        # \d+h* gets all digits before string
        # get float distance (in mi)
        # \d+h* in regex gets all digits before string
        dist_mi = str_to_dist(re.findall(r'\d+h*', set_dict['distance']))
        
        # get float time (in seconds)
        # \d+h* gets all digits before string
        # properly format (what if there is no secs? )
        time_str = set_dict['duration']
        if time_str.find('h') != -1:
            if time_str.find('s') != -1:
                time_str += ' 0 s'
                if time_str.find('m') == -1:
                    # some how insert into the middle of string for formatting
            if time_str.find('m') == -1:
                time_str += ' 0 m'
            if time_str.find('s') == -1:
                time_str += ' 0 s'
        print(time_str)
        time_sec = sec_to_hr(str_to_time(re.findall(r'\d+h*', time_str)))
        print(dist_mi)
        print(time_sec)
        velo = str(calVelocity(dist_mi, time_sec)) + ' mph'
        set_dict['speed'] = velo
    # need to create a transit 
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
def str_to_dist(arr):
    dist_mi = 0
    if len(arr) != 0:
        dist_mi = float(arr[0])
        arr.pop(0)
    return dist_mi
def str_to_time(arr):
    time_sec = 0
    hour = 0
    min = 0
    # print(result)
    if len(arr) == 3:
        hour = float(arr[0])
        arr.pop(0)
    # print(result)
    if len(arr) == 2:
        min = float(arr[0]) + hour * 60
        arr.pop(0)
    # print(result)
    if len(arr) == 1:
        time_sec = float(arr[0]) + min * 60
    print(time_sec)
    return time_sec
def getTime(arrival, departure):
    return (arrival - departure).total_seconds() / 3600.0
def calVelocity(dist, time):
    return dist / time
def sec_to_hr(sec):
    return sec / 3600.0
def walkResp(speed, dist, time):
    return "Time to run"
def bikeResp(speed, dist, time):
    return "Time to run"
def carResp(speed, dist, time):
    return "Seems reasonable..."
def transitResp(exp_time, act_time):
    # https://stackoverflow.com/questions/5259882/subtract-two-times-in-python
    return "You might have to run"