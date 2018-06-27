package com.btech.service;

        import java.io.FileOutputStream;
        import java.io.IOException;

        import org.apache.poi.hssf.usermodel.HSSFCell;
        import org.apache.poi.hssf.usermodel.HSSFFont;
        import org.apache.poi.hssf.usermodel.HSSFRow;
        import org.apache.poi.hssf.usermodel.HSSFSheet;
        import org.apache.poi.hssf.usermodel.HSSFWorkbook;
        import org.apache.poi.ss.usermodel.*;
        import org.apache.poi.ss.util.CellRangeAddress;
        import org.apache.poi.ss.util.CellUtil;
        import org.springframework.stereotype.Service;

@Service
public class ExcelGenerator {

    public static void clearStyles(HSSFWorkbook workbook) {
        CellStyle style = workbook.createCellStyle();
    }
    public static void companyName(HSSFCell cell, HSSFSheet sheet, HSSFRow row, HSSFFont defaultFont, CellStyle style) {
        cell.setCellValue("BTech Sp. z o. o.");
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 5));
        row.setHeightInPoints(20);
        //Pogrub
        defaultFont.setBold(true);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setCellStyle(style);
        //Wysrodkuj
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }

    public static void companyAddress(HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont, CellStyle style){
        //Drugi wiersz
        row = sheet.createRow(1);
        //Pierwsza kolumna
        cell = row.createCell(0);
        cell.setCellValue("54-203 Wrocław, ul. Legnicka 57D ");
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 5));
        row.setHeightInPoints(20);
        defaultFont.setBold(true);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderRight(BorderStyle.NONE);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void vatId(HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont, CellStyle style){
        row = sheet.createRow(2);
        cell = row.createCell(0);
        cell.setCellValue("NIP 894-290-89-85");
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, 5));
        row.setHeightInPoints(20);
        defaultFont.setBold(true);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void emptyRow(HSSFRow row, HSSFSheet sheet, HSSFCell cell, CellStyle style){
        row = sheet.createRow(3);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(3, 3, 0, 5));
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        row = sheet.createRow(4);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(4, 4, 0, 5));
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void tripOrder(HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont, CellStyle style, HSSFWorkbook workbook){
//		style = null;
//		style = workbook.createCellStyle();
        clearStyles(workbook);
        row = sheet.createRow(5);
        cell = row.createCell(0);
        cell.setCellValue("Polecenie wyjazdu służbowego nr");
        style.setFont(defaultFont);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(5, 5, 0, 3));
        cell = row.createCell(5);
        sheet.addMergedRegion(new CellRangeAddress(5, 5, 4, 5));
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void fromDay(HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont, CellStyle style, HSSFWorkbook workbook, String fromDay){
//		style = null;
//		style = workbook.createCellStyle();
        clearStyles(workbook);
        row = sheet.createRow(6);
        cell = row.createCell(0);
        DataFormat format = workbook.createDataFormat();
        cell.setCellValue("z dnia " + fromDay);
        row.setHeightInPoints(20);
        sheet.setColumnWidth(0, 4000);
        style.setDataFormat(format.getFormat("dd.mm.yyyy"));
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 1, 2));
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 4, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        //stylizowanie wiersza
        style = null;
        style = workbook.createCellStyle();
        for(int i = 1; i <= 4; i++) {
            cell = row.createCell(i);
            style.setBorderTop(BorderStyle.MEDIUM);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }
    public static void forWhom(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(7);
        cell = row.createCell(0);
        cell.setCellValue("dla");
        row.setHeightInPoints(20);
        sheet.setColumnWidth(0, 3000);
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(7, 7, 1, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        for(int i = 1; i <= 4; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }
    @SuppressWarnings("null")
    public static void info(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont) {
        style = null;
        style = workbook.createCellStyle();
        defaultFont = null;
        defaultFont = workbook.createFont();
        row = sheet.createRow(8);
        cell = row.createCell(1);
        cell.setCellValue("(Imię, Nazwisko, stanowisko służbowe)");
        defaultFont.setFontHeightInPoints((short) 7);
        style.setFont(defaultFont);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(8, 8, 1, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void where(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(9);
        cell = row.createCell(0);
        cell.setCellValue("do");
        row.setHeightInPoints(20);
        sheet.setColumnWidth(0, 3000);
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(9, 9, 1, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        for(int i = 0; i <= 4; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }
    public static void destination(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont) {
        style = null;
        style = workbook.createCellStyle();
        defaultFont = null;
        defaultFont = workbook.createFont();
        row = sheet.createRow(10);
        cell = row.createCell(1);
        cell.setCellValue("(Miejscowość docelowa)");
        defaultFont.setFontHeightInPoints((short) 7);
        style.setFont(defaultFont);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(10, 10, 1, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void time(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(11);
        cell = row.createCell(0);
        cell.setCellValue("na czas");
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        sheet.addMergedRegion(new CellRangeAddress(11, 11, 1, 2));

        style = null;
        cell = row.createCell(1);
        style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);

        style = null;
        cell = row.createCell(2);
        style = workbook.createCellStyle();
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        for(int i = 3; i < 5; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }
        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }
    public static void timeInfo(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont){
        style = null;
        style = workbook.createCellStyle();
        defaultFont = null;
        defaultFont = workbook.createFont();
        row = sheet.createRow(12);
        cell = row.createCell(1);
        cell.setCellValue("od");
        sheet.addMergedRegion(new CellRangeAddress(12, 12, 1, 2));
        defaultFont.setFontHeightInPoints((short) 7);
        style.setFont(defaultFont);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(3);
        cell.setCellValue("do");
        sheet.addMergedRegion(new CellRangeAddress(12, 12, 3, 5));
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }

    public static void purpose(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(13);
        cell = row.createCell(0);
        cell.setCellValue("w celu");
        row.setHeightInPoints(20);
        sheet.setColumnWidth(0, 3000);
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
        sheet.addMergedRegion(new CellRangeAddress(13, 13, 1, 5));
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        for(int i = 1; i <= 4; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }
    @SuppressWarnings("null")
    public static void transport(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(14);
        cell = row.createCell(0);
        cell.setCellValue("Środek transportu");
        row.setHeightInPoints(20);
        sheet.addMergedRegion(new CellRangeAddress(14, 14, 0, 1));
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(1);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);

        sheet.addMergedRegion(new CellRangeAddress(14, 14, 2, 3));
        cell = row.createCell(2);
//		cell.setCellValue("samochód prywatny");
//		cell.setCellType(CellType.FORMULA);
//		String car = "samochód służbowy";
//		String car1 = "samochód prywatny";
//		String reg = "Nr rejstr.";
//		String formula = "JEŻELI(LUB(C15=" + car + ",C15=" + car1 + ")," + reg + ",'')";
//		cell.setCellFormula("JEŻELI(LUB(C19='samochód służbowy',C19='samochód prywatny'),'Nr rejstr.','')");
//		cell.setCellFormula(formula);
        cell.setCellStyle(style);
        cell = row.createCell(3);
        cell.setCellStyle(style);

        cell = row.createCell(4);
        cell.setCellValue("Nr rejestr.");
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.DASHED);
        cell.setCellStyle(style);
    }

    @SuppressWarnings("deprecation")
    public static void date(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell){
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(15);
        cell = row.createCell(0);
        DataFormat format = workbook.createDataFormat();
        cell.setCellType(CellType.FORMULA);
        cell.setCellFormula("B7");
        style.setDataFormat(format.getFormat("dd.mm.yyyy"));
        style.setBorderBottom(BorderStyle.DASHED);
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        row.setHeightInPoints(20);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        sheet.addMergedRegion(new CellRangeAddress(15, 15, 1, 5));

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }

    public static void signatures(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont) {
        style = null;
        style = workbook.createCellStyle();
        defaultFont = null;
        defaultFont = workbook.createFont();
        row = sheet.createRow(16);
        cell = row.createCell(0);
        cell.setCellValue("………….….. data");
        row.setHeightInPoints((2*sheet.getDefaultRowHeightInPoints()));
        style.setWrapText(true);
        defaultFont.setFontHeightInPoints((short) 8);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFont(defaultFont);
        style.setBorderBottom(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        sheet.addMergedRegion(new CellRangeAddress(16, 16, 4, 5));
        cell = row.createCell(4);
        cell.setCellValue("………….…..................... Podpis zlecającego wyjazd");
        row.setHeightInPoints((2*sheet.getDefaultRowHeightInPoints()));
        style.setWrapText(true);
        sheet.setColumnWidth(4, 3000);
        defaultFont.setFontHeightInPoints((short) 8);
        style.setFont(defaultFont);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }

    public static void infoCash(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(17);
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        row = sheet.createRow(18);
        cell = row.createCell(0);
        cell.setCellValue("Proszę o wypłacenie zaliczki w kwocie");
        cell = row.createCell(5);
        cell.setCellStyle(style);

        row = sheet.createRow(19);
        cell = row.createCell(0);
        cell.setCellValue("na pokrycie kosztów wyjazdu służbowego");
        cell = row.createCell(5);
        cell.setCellStyle(style);
    }

    public static void delegatedSignature(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(20);
        for(int i = 0; i < 5; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        style = null;
        style = workbook.createCellStyle();
        defaultFont = null;
        defaultFont = workbook.createFont();
        cell = row.createCell(4);
        sheet.addMergedRegion(new CellRangeAddress(20, 20, 4, 5));
        cell.setCellValue("………….…..................... (Podpis delegowanego)");
        row.setHeightInPoints((2*sheet.getDefaultRowHeightInPoints()));
        style.setWrapText(true);
        defaultFont.setFontHeightInPoints((short) 8);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFont(defaultFont);
        style.setBorderBottom(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(5);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
    }
    public static void breakLine(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell){
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(21);
        for(int i = 0; i < 8; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.DASHED);
            cell.setCellStyle(style);
        }
    }
    public static void title(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont){
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(22);
        cell = row.createCell(0);
        cell.setCellValue("RACHUNEK KOSZTÓW PODRÓŻY");
        defaultFont.setBold(true);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderBottom(BorderStyle.MEDIUM);
        style.setBorderLeft(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        for(int i = 1; i < 8; i++) {
            cell = row.createCell(i);
            style.setBorderBottom(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        sheet.addMergedRegion(new CellRangeAddress(22, 22, 0, 8));
    }
    @SuppressWarnings("null")
    public static void belowTitle(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell, HSSFFont defaultFont) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(23);
        cell = row.createCell(0);
        cell.setCellValue("WYJAZD");
        defaultFont.setBold(true);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        row.setHeightInPoints(15);
//		style.setBorderBottom(BorderStyle.MEDIUM);
        style.setBorderLeft(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        sheet.addMergedRegion(new CellRangeAddress(23, 23, 0, 2));

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(2);
        row.setHeightInPoints(15);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(3);
        cell.setCellValue("PRZYJAZD");
        defaultFont.setBold(true);
        row.setHeightInPoints(15);
        style.setFont(defaultFont);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        sheet.addMergedRegion(new CellRangeAddress(23, 23, 3, 5));

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(6);
        cell.setCellValue("Środek");
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(7);
        cell.setCellValue("Koszty");
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

    }
    public static void infoTitle(HSSFWorkbook workbook, HSSFSheet sheet) {
        CellStyle style;
        style = workbook.createCellStyle();
        HSSFRow row = sheet.createRow(24);
        HSSFCell cell = row.createCell(0);
        cell.setCellValue("miejscowość");
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderBottom(BorderStyle.MEDIUM);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        sheet.setColumnWidth(0, 3000);
        row.setHeightInPoints(20);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(1);
        cell.setCellValue("data");
//		style.setBorderBottom(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(2);
        cell.setCellValue("godz.");
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(3);
        cell.setCellValue("miejscowość");
        sheet.setColumnWidth(3, 3000);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(4);
        cell.setCellValue("data");
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(5);
        cell.setCellValue("godz.");
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(6);
        cell.setCellValue("transportu (km)");
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setWrapText(true);
        style.setBorderBottom(BorderStyle.MEDIUM);
        row.setHeightInPoints(25);
        sheet.setColumnWidth(6, 3000);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(7);
        cell.setCellValue("przejazdu");
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
    }
    public static void fillTable(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        for(int i = 25; i <= 31; i++) {
            row = sheet.createRow(i);
            for(int j = 0; j < 8; j++) {
                cell = row.createCell(j);
                style.setBorderBottom(BorderStyle.DASHED);
                style.setBorderRight(BorderStyle.MEDIUM);
                cell.setCellStyle(style);
            }
        }
    }
    public static void checkBillFirst(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
        row = sheet.createRow(32);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(32, 32, 0, 3));
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setCellValue("Rachunek sprawdzono pod względem");
        style.setBorderTop(BorderStyle.MEDIUM);
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        for(int i = 1; i <= 3; i++) {
            cell = row.createCell(i);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        cell = row.createCell(3);
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(4);
        sheet.addMergedRegion(new CellRangeAddress(32, 32, 4, 6));
        cell.setCellValue("Ryczałty za dojazd");
        style.setBorderBottom(BorderStyle.DASHED);
        style.setBorderTop(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        cell = row.createCell(5);
        cell.setCellStyle(style);

        cell = row.createCell(6);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        cell = row.createCell(7);
        cell.setCellStyle(style);
    }
    public static void checkBillSecond(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;
        style = workbook.createCellStyle();
//		checkBillFirst(style, workbook, row, sheet, cell);
        row = sheet.createRow(33);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(33, 33, 0, 3));
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setCellValue("formalnym i rachunkowym");
        cell.setCellStyle(style);
        CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);

        cell = row.createCell(3);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        style = null;
        style = workbook.createCellStyle();
        cell = row.createCell(4);
        sheet.addMergedRegion(new CellRangeAddress(33, 33, 4, 6));
        cell.setCellValue("Razem przejazdy, dojazdy");
        style.setBorderBottom(BorderStyle.DASHED);
        style.setBorderTop(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        cell = row.createCell(5);
        cell.setCellStyle(style);

        cell = row.createCell(6);
        style.setBorderRight(BorderStyle.MEDIUM);
        cell.setCellStyle(style);

        cell = row.createCell(7);
        cell.setCellStyle(style);
    }

    public static void checkBillThird(CellStyle style, HSSFWorkbook workbook, HSSFRow row, HSSFSheet sheet, HSSFCell cell) {
        style = null;

    }
    public static void generateExcell(String fromDay) throws IOException {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("delegacja");
        HSSFRow row = sheet.createRow(0);
        HSSFCell cell = row.createCell(0);
        CellStyle style = workbook.createCellStyle();
        HSSFFont defaultFont = workbook.createFont();

        sheet.setDisplayGridlines(false);
        ExcelGenerator object = new ExcelGenerator();
        //Nazwa firmy
        companyName(cell, sheet, row, defaultFont, style);
        //Adres firmy
        companyAddress(row, sheet, cell, defaultFont, style);
        //NIP
        vatId(row, sheet, cell, defaultFont, style);
        //Puste wiersze
        emptyRow(row, sheet, cell, style);
        //Polecenie
        tripOrder(row, sheet, cell, defaultFont, style, workbook);
        //z dnia
        fromDay(row, sheet, cell, defaultFont, style, workbook, fromDay);
        //dla
        forWhom(style, workbook, row, sheet, cell);
        //info dane
        info(style, workbook, row, sheet, cell, defaultFont);
        //do
        where(style, workbook, row, sheet, cell);
        //gdzie
        destination(style, workbook, row, sheet, cell, defaultFont);
        //na czas
        time(style, workbook, row, sheet, cell);
        //opis
        timeInfo(style, workbook, row, sheet, cell, defaultFont);
        //w celu
        purpose(style, workbook, row, sheet, cell);
        //transport
        transport(style, workbook, row, sheet, cell);
        //data
        date(style, workbook, row, sheet, cell);
        //podpisy
        signatures(style, workbook, row, sheet, cell, defaultFont);
        //zaliczka
        infoCash(style, workbook, row, sheet, cell);
        //podpis delegowanego
        delegatedSignature(style, workbook, row, sheet, cell, defaultFont);
        //linia przerywana
        breakLine(style, workbook, row, sheet, cell);
        //tytuł druga tabela
        title(style, workbook, row, sheet, cell, defaultFont);
        //tytul dół
        belowTitle(style, workbook, row, sheet, cell, defaultFont);
        //tytuł dół opis
        infoTitle(workbook, sheet);
        //wypełnianie tabeli
        fillTable(style, workbook, row, sheet, cell);
        checkBillFirst(style, workbook, row, sheet, cell);
        checkBillSecond(style, workbook, row, sheet, cell);
        checkBillThird(style, workbook, row, sheet, cell);

        //---------Setting data------------//

        Sheet sh = workbook.getSheetAt(0);
        Cell delegationNr = sh.getRow(1).getCell(3);
        delegationNr.setCellValue(49);

        workbook.write(new FileOutputStream("excel.xls"));
        workbook.close();
    }
}
