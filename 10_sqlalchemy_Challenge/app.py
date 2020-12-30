import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# import Flask
from flask import Flask,jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")


connection=engine.connect()


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Assign the measurement class to a variable called `measurement`
measurement = Base.classes.measurement
# Assign the station class to a variable called `station`
station = Base.classes.station

# Create an app, being sure to pass __name__
app = Flask(__name__)


# Define home page
@app.route("/")
def home():
    """List all available api routes."""
    return ( f"<h1>Welcome to the Hawaii Weather API!<h1/><br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
        )

# Define the /precipitation route
@app.route("/api/v1.0/precipitation")
def precipitation():
    session = Session(engine)
    # Create our session (link) from Python to the DB
    # precipitation_query = "select * from measurement where date > '2016-08-23'and date <= '2017-08-23' order by date "
    # results = session.execute(precipitation_query).fetchall()
    results = session.query(measurement.date,measurement.prcp).filter(measurement.date > '2016-08-23' , measurement.date <= '2017-08-23').order_by(measurement.date).all()

    session.close()  

    return jsonify(results)



# Define the /api/v1.0/stations route
@app.route("/api/v1.0/stations")
def station():
    session = Session(engine)
    results = session.query(measurement.station, func.count(measurement.prcp)).group_by(measurement.station).order_by(measurement.prcp).all()

    session.close()

    return jsonify(results)


# Define the /api/v1.0/tobs route
@app.route("/api/v1.0/tobs")
def tobs():
    session = Session(engine)
    results = session.query(measurement.date, measurement.tobs).filter(measurement.station == 'USC00519281',measurement.date > '2016-08-23' , measurement.date <= '2017-08-23' ).all()

    session.close()

    return jsonify(results)



# Define the /api/v1.0/<start> route
@app.route("/api/v1.0/")
def start():
    session = Session(engine)

    min_temp = session.query(func.min(measurement.tobs)).filter(measurement.station == 'USC00519281').all()
    max_temp = session.query(func.max(measurement.tobs)).filter(measurement.station == 'USC00519281').all()
    mean_temp = session.query(func.avg(measurement.tobs)).filter(measurement.station == 'USC00519281').all()

    session.close()

    all_results = [min_temp, mean_temp, max_temp]

    return jsonify(all_results)



# Define the /api/v1.0/<start>/<end> route
@app.route("/api/v1.0//")
def start_end():
    session = Session(engine)

    min_temp = session.query(func.min(measurement.tobs)).filter(measurement.station == 'USC00519281').all()
    max_temp = session.query(func.max(measurement.tobs)).filter(measurement.station == 'USC00519281').all()
    mean_temp = session.query(func.avg(measurement.tobs)).filter(measurement.station == 'USC00519281').all()

    session.close()

    all_results = [min_temp, mean_temp, max_temp]

    return jsonify(all_results)




if __name__ == "__main__":
    app.run(debug=True)