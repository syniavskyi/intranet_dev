package com.btech.pojo.delegations;

public class TravelCostAccount {

    private String departureCity, departureDate, departureHour;
    private String arrivalCity, arrivalDate, arrivalHour;
    private float distance, travelExpences;

    public TravelCostAccount() {}

    public TravelCostAccount(String departureCity, String departureDate, String departureHour,
                             String arrivalCity, String arrivalDate, String arrivalHour,
                             float distance, float travelExpences) {
        this.departureCity = departureCity;
        this.departureDate = departureDate;
        this.departureHour = departureHour;
        this.arrivalCity = arrivalCity;
        this.arrivalDate = arrivalDate;
        this.arrivalHour = arrivalHour;
        this.distance = distance;
        this.travelExpences = travelExpences;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public TravelCostAccount setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
        return this;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public TravelCostAccount setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
        return this;
    }

    public String getDepartureHour() {
        return departureHour;
    }

    public TravelCostAccount setDepartureHour(String departureHour) {
        this.departureHour = departureHour;
        return this;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public TravelCostAccount setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
        return this;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public TravelCostAccount setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
        return this;
    }

    public String getArrivalHour() {
        return arrivalHour;
    }

    public TravelCostAccount setArrivalHour(String arrivalHour) {
        this.arrivalHour = arrivalHour;
        return this;
    }

    public float getDistance() {
        return distance;
    }

    public TravelCostAccount setDistance(float distance) {
        this.distance = distance;
        return this;
    }

    public float getTravelExpences() {
        return travelExpences;
    }

    public TravelCostAccount setTravelExpences(float travelExpences) {
        this.travelExpences = travelExpences;
        return this;
    }

    @Override
    public String toString() {
        return "TravelCostAccount{" +
                "departureCity='" + departureCity + '\'' +
                ", departureDate='" + departureDate + '\'' +
                ", departureHour='" + departureHour + '\'' +
                ", arrivalCity='" + arrivalCity + '\'' +
                ", arrivalDate='" + arrivalDate + '\'' +
                ", arrivalHour='" + arrivalHour + '\'' +
                ", distance=" + distance +
                ", travelExpences=" + travelExpences +
                '}';
    }
}
