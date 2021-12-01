import XLSX from "xlsx";

export const exportToExcel = (csvData, fileName) => {
	var ws = XLSX.utils.json_to_sheet(csvData);

	/* add to workbook */
	var wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "People");

	/* generate an XLSX file */
	XLSX.writeFile(wb, `${fileName}.xlsx`);
};
