package com.btech.controllers;

import com.btech.model.User;
import com.btech.pojo.delegations.Costs;
import com.btech.pojo.delegations.Delegation;
import com.btech.pojo.delegations.TravelCostAccount;
import com.btech.service.ExcelGenerator;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

@RestController
public class DelegationsController {

    private final ExcelGenerator excelGenerator;

    @Autowired
    public DelegationsController(ExcelGenerator excelGenerator) {
        this.excelGenerator = excelGenerator;
    }

    @RequestMapping(value = "/api/delegations/generate", method = RequestMethod.POST)
    public int generate(@RequestBody Delegation delegation) throws JSONException {
        String delegationNr = delegation.getDelegationNr();
        String delegationDayCreated = delegation.getDelegationDayCreated();
        String delegationDateFrom = delegation.getDelegationDateFrom();
        String delegationDateTo = delegation.getDelegationDateTo();
        String delegationTotalDiet = delegation.getDelegationTotalDiet();
        String delegationCity = delegation.getDelegationCity();
        String delegationGoal = delegation.getDelegationGoal();
        String delegationTransport = delegation.getDelegationTransport();
        List<TravelCostAccount> travelCostAccount = delegation.getTravelCostAccount();
        List<Costs> costs = delegation.getCosts();


        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("Costs");

        Row row12 = sheet.createRow((short) 0);
        row12.createCell(0).setCellValue("Delegation Number");
        row12.createCell(1).setCellValue("Delegation day created");
        row12.createCell(2).setCellValue("Delegation date From");
        row12.createCell(3).setCellValue("Delegation date To");
        row12.createCell(4).setCellValue("Delegation total diet");
        row12.createCell(5).setCellValue("Delegation city");
        row12.createCell(6).setCellValue("Delegation goal");
        row12.createCell(7).setCellValue("Delegation transport");

        Row row13 = sheet.createRow((short) 1);
        row13.createCell(0).setCellValue(delegationNr);
        row13.createCell(1).setCellValue(delegationDayCreated);
        row13.createCell(2).setCellValue(delegationDateFrom);
        row13.createCell(3).setCellValue(delegationDateTo);
        row13.createCell(4).setCellValue(delegationTotalDiet);
        row13.createCell(5).setCellValue(delegationCity);
        row13.createCell(6).setCellValue(delegationGoal);
        row13.createCell(7).setCellValue(delegationTransport);

        Row row1 = sheet.createRow((short) 3);
        row1.createCell(0).setCellValue("Document Number");
        row1.createCell(1).setCellValue("Firm");
        row1.createCell(2).setCellValue("Document date");
        row1.createCell(3).setCellValue("Accomoddations");
        row1.createCell(4).setCellValue("Journeys");
        row1.createCell(5).setCellValue("Others");
        row1.createCell(6).setCellValue("Is return");
        row1.createCell(7).setCellValue("Currency PLN");
        row1.createCell(8).setCellValue("Amount PLN");

        int i = 4;
        for (Costs c : costs) {
            Row row2 = sheet.createRow(i++);
            row2.createCell(0).setCellValue(c.getDocumentNr());
            row2.createCell(1).setCellValue(c.getFirm());
            row2.createCell(2).setCellValue(c.getDocumentDate());
            row2.createCell(3).setCellValue(c.getAccomodations());
            row2.createCell(4).setCellValue(c.getJourneys());
            row2.createCell(5).setCellValue(c.getOthers());
            row2.createCell(6).setCellValue(c.isReturn());
            row2.createCell(7).setCellValue(c.getCurrencyPLN());
            row2.createCell(8).setCellValue(c.getAmountPLN());
        }

        HSSFSheet sheet1 = wb.createSheet("Travel Costs Account");

        Row row3 = sheet1.createRow((short) 0);
        row3.createCell(0).setCellValue("Departure city");
        row3.createCell(1).setCellValue("Departure date");
        row3.createCell(2).setCellValue("Departure hour");
        row3.createCell(3).setCellValue("Arrival city");
        row3.createCell(4).setCellValue("Arrival date");
        row3.createCell(5).setCellValue("Arrival hour");
        row3.createCell(6).setCellValue("Distance");
        row3.createCell(7).setCellValue("Travel expences");

        int j = 1;
        for (TravelCostAccount tca : travelCostAccount) {
            Row row4 = sheet1.createRow(j++);
            row4.createCell(0).setCellValue(tca.getDepartureCity());
            row4.createCell(1).setCellValue(tca.getDepartureDate());
            row4.createCell(2).setCellValue(tca.getDepartureHour());
            row4.createCell(3).setCellValue(tca.getArrivalCity());
            row4.createCell(4).setCellValue(tca.getArrivalDate());
            row4.createCell(5).setCellValue(tca.getArrivalHour());
            row4.createCell(6).setCellValue(tca.getDistance());
            row4.createCell(7).setCellValue(tca.getTravelExpences());
        }

        try {
            wb.write(new FileOutputStream("excelNew.xls"));
            wb.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return travelCostAccount.size();
    }
}
