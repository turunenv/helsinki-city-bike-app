# a python script to create the database

import csv
import re
import os
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

db = mysql.connector.connect(
    host="localhost", user=os.getenv("DB_USER"), password=os.getenv("DB_PASSWORD")
)

cursor = db.cursor()

cursor.execute("DROP DATABASE IF EXISTS bikejourneydb")


# helper function to ensure we don't add empty strings instead of null to the database
def remove_empty_values_from_dict(dict):
    non_empty_dict = {}

    for key in dict.keys():
        if not re.match("^\s+$", dict[key]):
            non_empty_dict[key] = dict[key]

    return non_empty_dict


def map_station_csv_cols_to_db_cols(dict):
    ret_dict = {}

    for key in dict.keys():
        if key == "ID":
            ret_dict["station_id"] = dict[key]
        if key == "Nimi":
            ret_dict["name_fi"] = dict[key]
        if key == "Namn":
            ret_dict["name_swe"] = dict[key]
        if key == "Name":
            ret_dict["name_eng"] = dict[key]
        if key == "Osoite":
            ret_dict["address_fi"] = dict[key]
        if key == "Adress":
            ret_dict["address_swe"] = dict[key]
        if key == "Kaupunki":
            ret_dict["city_fi"] = dict[key]
        if key == "Stad":
            ret_dict["city_swe"] = dict[key]
        if key == "Operaattor":
            ret_dict["operator"] = dict[key]
        if key == "Kapasiteet":
            ret_dict["capacity"] = dict[key]
        if key == "x":
            ret_dict["longitude"] = dict[key]
        if key == "y":
            ret_dict["latitude"] = dict[key]

    return ret_dict


def construct_insert_query(table_name, dict):
    col_names = "("
    values = "("
    for i, key in enumerate(dict.keys()):
        if i == len(dict.keys()) - 1:
            # final colname, add closing paranthesis
            col_names += f"{key})"
            values += f'"{dict[key]}")'
        else:
            col_names += f"{key}, "
            values += f'"{dict[key]}", '

    query = f"INSERT INTO {table_name} {col_names} VALUES {values}"

    return query


# create the database
cursor.execute("CREATE DATABASE IF NOT EXISTS bikejourneydb")
cursor.execute("USE bikejourneydb")

cursor.execute("SET GLOBAL max_allowed_packet=16777216")

# create the tables
cursor.execute(
    """
CREATE TABLE bike_station (
    station_id SMALLINT NOT NULL,
    name_fi VARCHAR(40),
    name_swe VARCHAR(40),
    name_eng VARCHAR(40),
    address_fi VARCHAR(40),
    address_swe VARCHAR(40),
    city_fi VARCHAR(40),
    city_swe VARCHAR(40),
    operator VARCHAR(40),
    capacity SMALLINT,
    longitude FLOAT,
    latitude FLOAT,

    PRIMARY KEY(station_id)
    )
"""
)

cursor.execute(
    """
    CREATE TABLE journey (
    journey_id INT NOT NULL AUTO_INCREMENT,
    departure DATETIME NOT NULL,
    arrival DATETIME NOT NULL,
    departure_station_id SMALLINT,
    arrival_station_id SMALLINT,
    travel_dist INT NOT NULL,
    duration INT AS (TIMESTAMPDIFF(SECOND, departure, arrival)),
    
    PRIMARY KEY (journey_id),
    FOREIGN KEY (departure_station_id) REFERENCES bike_station(station_id),
    FOREIGN KEY (arrival_station_id) REFERENCES bike_station(station_id)
    )
"""
)

# add the station data to the database
with open(
    "./dataset/stations/helsinki_espoo_bike_stations.csv",
    newline="",
    encoding="utf-8-sig",
) as station_file:
    station_reader = csv.DictReader(station_file)

    # ensure no duplicate station ids
    station_ids = set()

    for idx, station in enumerate(station_reader):
        loop_iteration = idx + 1
        station_ids.add(station["ID"])

        if len(station_ids) < loop_iteration:
            # we have encountered a duplicate id
            print(f'duplicate stations detected, id: {station["ID"]}')

            # fix the duplication and try again
            break

        try:
            station_info = remove_empty_values_from_dict(station)
            db_station = map_station_csv_cols_to_db_cols(station_info)

            query = construct_insert_query("bike_station", db_station)
            cursor.execute(query)

        except Exception as e:
            print(e)
            print(query)

db.commit()

# add the journey data to the database
journey_files = os.listdir("./dataset/journeys/")

journey_data = []

for file_name in journey_files:
    with open(
        f"./dataset/journeys/{file_name}",
        newline="",
        encoding="utf-8-sig",
    ) as journey_file:
        journey_reader = csv.DictReader(journey_file)

        for journey in journey_reader:
            try:
                journey_entry = (
                    journey["Departure"],
                    journey["Return"],
                    journey["Departure station id"],
                    journey["Return station id"],
                    journey["Covered distance (m)"],
                )

                # check the requirements given in the assignment
                departure = datetime.strptime(journey_entry[0], "%Y-%m-%dT%H:%M:%S")
                arrival = datetime.strptime(journey_entry[1], "%Y-%m-%dT%H:%M:%S")
                duration = (arrival - departure).total_seconds()

                dist = int(journey_entry[4])

                if duration < 10 or dist < 10:
                    continue

                journey_data.append(journey_entry)

            except:
                print(f"failed to add journey entry in file {file_name}, row {idx+2}")

query = """
    INSERT IGNORE INTO journey
        (departure, arrival, departure_station_id, arrival_station_id, travel_dist)
    VALUES
        (%s, %s, %s, %s, %s)
"""

# too large to execute in one batch, break it up
indeces = list(range(0, len(journey_data), len(journey_data) // 100))
indeces.append(len(journey_data))

for i in range(len(indeces) - 1):
    start = indeces[i]
    stop = indeces[i + 1]

    cursor.executemany(query, journey_data[start:stop])
    print("success")

db.commit()
cursor.close()
db.close()
