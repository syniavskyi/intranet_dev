package com.btech.pojo.delegations;

public class Costs {

    private String documentDate, firm, documentNr;
    private boolean isReturn;
    private float accomodations, journeys, others, currencyPLN, amountPLN;

    public Costs() {}

    public Costs(String documentDate, String firm, String documentNr,
                 boolean isReturn, float accomodations, float journeys,
                 float others, float currencyPLN, float amountPLN) {
        this.documentDate = documentDate;
        this.firm = firm;
        this.documentNr = documentNr;
        this.isReturn = isReturn;
        this.accomodations = accomodations;
        this.journeys = journeys;
        this.others = others;
        this.currencyPLN = currencyPLN;
        this.amountPLN = amountPLN;
    }

    public String getDocumentDate() {
        return documentDate;
    }

    public Costs serDocumentDate(String documentDate) {
        this.documentDate = documentDate;
        return this;
    }

    public String getFirm() {
        return firm;
    }

    public Costs setFirm(String firm) {
        this.firm = firm;
        return this;
    }

    public String getDocumentNr() {
        return documentNr;
    }

    public Costs setDocumentNr(String documentNr) {
        this.documentNr = documentNr;
        return this;
    }

    public boolean isReturn() {
        return isReturn;
    }

    public Costs setReturn(boolean isReturn) {
        this.isReturn = isReturn;
        return this;
    }

    public float getAccomodations() {
        return accomodations;
    }

    public Costs setAccomodations(float accomodations) {
        this.accomodations = accomodations;
        return this;
    }

    public float getJourneys() {
        return journeys;
    }

    public Costs setJourneys(float journeys) {
        this.journeys = journeys;
        return this;
    }

    public float getOthers() {
        return others;
    }

    public Costs setOthers() {
        this.others = others;
        return this;
    }

    public float getCurrencyPLN() {
        return currencyPLN;
    }

    public Costs setCurrencyPLN() {
        this.currencyPLN = currencyPLN;
        return this;
    }

    public float getAmountPLN() {
        return amountPLN;
    }

    public Costs setAmountPLN(float amountPLN) {
        this.amountPLN = amountPLN;
        return this;
    }
}
