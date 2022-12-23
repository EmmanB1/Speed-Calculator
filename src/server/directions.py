import googlemaps
from datetime import datetime
from pprint import pprint
from key import getKey

def getDirection(start, end, transport="walking", departure=datetime.now(), unit="imperial"):
    gmaps = googlemaps.Client(key=getKey())
    # # Geocoding an address
    # geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

    # # Look up an address with reverse geocoding
    # reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

    # starting location, ending location, mode: (walking, transit, train, bike, plane)
    # departure_time
    directions_result = gmaps.directions(start,
                                        end,
                                        mode=transport,
                                        departure_time=departure,
                                        units= unit)

    # Validate an address with address validation
    # addressvalidation_result =  gmaps.addressvalidation(['1600 Amphitheatre Pk'], 
    #                                                     regionCode='US',
    #                                                     locality='Mountain View', 
    #     
    #                                                 enableUspsCass=True)
    return directions_result

# data = getDirection("Renaissance Schaumburg Convention Center Hotel", "Topgolf, Schaumburg", "driving")
# # gets distance
# pprint(data[0]['legs'][0]['duration'])
# pprint(data[0]['legs'][0]['distance'])
# gets time