package com.btech.pojo.delegations;

import com.btech.pojo.delegations.TravelCostAccount;

import java.util.List;

public class Delegation {

    private String delegationNr, delegationDayCreated, delegationDateFrom, delegationDateTo,
                   delegationTotalDiet, delegationCity, delegationGoal, delegationTransport;
    private float delegationHoursNumber;
    private List<TravelCostAccount> travelCostAccount;
    private List<Costs> costs;

    public Delegation() {}

    public Delegation(String delegationNr, String delegationDayCreated, String delegationDateFrom,
                      String delegationDateTo, String delegationTotalDiet, String delegationCity,
                      String delegationGoal, String delegationTransport, float delegationHoursNumber,
                      List<TravelCostAccount> travelCostAccount, List<Costs> costs) {
        this.delegationNr = delegationNr;
        this.delegationDayCreated = delegationDayCreated;
        this.delegationDateFrom = delegationDateFrom;
        this.delegationDateTo = delegationDateTo;
        this.delegationTotalDiet = delegationTotalDiet;
        this.delegationCity = delegationCity;
        this.delegationGoal = delegationGoal;
        this.delegationTransport = delegationTransport;
        this.delegationHoursNumber = delegationHoursNumber;
        this.travelCostAccount = travelCostAccount;
        this.costs = costs;
    }

    public String getDelegationNr() {
        return delegationNr;
    }

    public Delegation setDelegationNr(String delegationNr) {
        this.delegationNr = delegationNr;
        return this;
    }

    public String getDelegationDayCreated() {
        return delegationDayCreated;
    }

    public Delegation setDelegationDayCreated(String delegationDayCreated) {
        this.delegationDayCreated = delegationDayCreated;
        return this;
    }

    public String getDelegationDateFrom() {
        return delegationDateFrom;
    }

    public Delegation setDelegationDateFrom(String delegationDateFrom) {
        this.delegationDateFrom = delegationDateFrom;
        return this;
    }

    public String getDelegationDateTo() {
        return delegationDateTo;
    }

    public Delegation setDelegationDateTo(String delegationDateTo) {
        this.delegationDateTo = delegationDateTo;
        return this;
    }

    public String getDelegationTotalDiet() {
        return delegationTotalDiet;
    }

    public Delegation setDelegationTotalDiet(String delegationTotalDiet) {
        this.delegationTotalDiet = delegationTotalDiet;
        return this;
    }

    public String getDelegationCity() {
        return delegationCity;
    }

    public Delegation setDelegationCity(String delegationCity) {
        this.delegationCity = delegationCity;
        return this;
    }

    public String getDelegationGoal() {
        return delegationGoal;
    }

    public Delegation setDelegationGoal(String delegationGoal) {
        this.delegationGoal = delegationGoal;
        return this;
    }

    public String getDelegationTransport() {
        return delegationTransport;
    }

    public Delegation setDelegationTransport(String delegationTransport) {
        this.delegationTransport = delegationTransport;
        return this;
    }

    public float getDelegationHoursNumber() {
        return delegationHoursNumber;
    }

    public Delegation setDelegationHoursNumber(float delegationHoursNumber) {
        this.delegationHoursNumber = delegationHoursNumber;
        return this;
    }

    public List<Costs> getCosts() {
        return costs;
    }

    public Delegation setCosts(List<Costs> costs) {
        this.costs = costs;
        return this;
    }

    public List<TravelCostAccount> getTravelCostAccount() {
        return travelCostAccount;
    }

    public Delegation setTravelCostAccount(List<TravelCostAccount> travelCostAccount) {
        this.travelCostAccount = travelCostAccount;
        return this;
    }
}
