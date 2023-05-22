jQuery.sap.declare("com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.QuantityFormat");
jQuery.sap.require("com.amadeus.fiori.ppm.commons.util.CommonFormatter");

com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter = {

	// note: variable is global for the entire shell (for all application instances)
	oResourceBundle: null,
	oShortDateFormat: null,
	oLongDateFormat: null,
	oNumberFormat: null,
	oNumberFormatOptions: {
		decimals: 2,
		groupingEnabled: true,
		groupingSeparator: ",",
		decimalSeparator: "."
	},

	/**
	 * @memberOf com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter
	 */
	getBundle: function () {
		if (com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle) {
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle;
		}
		return {
			getText: function (a, b) {
				return "ERROR";
			}
		};
	},

	getShortDateFormat: function () {
		if (com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oShortDateFormat) {
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oShortDateFormat;
		}
		return "dd/MM/yyyy";
	},

	getLongDateFormat: function () {
		if (com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oLongDateFormat) {
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oLongDateFormat;
		}
		return "dd/MM/yyyy";
	},

	getNumberFormat: function () {
		if (com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oNumberFormat) {
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oNumberFormat;
		}
		return "### ### ##0,##";
	},

	formatDateShort: function (dDate) {
		if (dDate) {
			var oDateFormatShort = sap.ca.ui.model.format.DateFormat.getDateInstance({
				style: "short"
			});
			return oDateFormatShort.format(dDate);
		};
		return "";
	},

	uppercaseFirstChar: function (sStr) {
		return sStr.charAt(0).toUpperCase() + sStr.slice(1);
	},

	pastStatusState: function (sDate) {
		var currentTime = new Date();
		return sDate < currentTime ? "Error" : "None";
	},

	pastStatusValue: function (sDate) {
		var currentTime = new Date();
		return sDate < currentTime ? "Completed" : "";
	},

	currencyValue: function (value) {
		return parseFloat(value).toFixed(2);
	},

	formatDate: function (sDate) {
		if (typeof sDate === "string") {
			return sDate;
		} else if (sDate) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.getShortDateFormat() });
			return dateFormat.format(sDate);
		}
		return "";
	},

	formatTimestamp: function (timestamp) {
		if (timestamp)
			return timestamp.substring(6, 8) + "." + timestamp.substring(4, 6) + "." + timestamp.substring(0, 4) + " "
				+ timestamp.substring(8, 10) + ":" + timestamp.substring(10, 12) + ":" + timestamp.substring(12);
		else
			return "";
	},

	formatLongDate: function (sDate) {
		if (typeof sDate === "string") {
			return sDate;
		} else if (sDate) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.getLongDateFormat() });
			return dateFormat.format(sDate);
		}
		return "";
	},

	getMonthString: function (month) {
		var monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return monthStrings[month];
	},

	iconForOrderType: function (orderType) {
		if (orderType === 'ZCR') {
			return "sap-icon://request";
		} else {
			return "sap-icon://collections-insight";
		}
	},

	formatDatesForList: function (startDate, finishDate) {
		var mStartDay = startDate.getDate() > 9 ? startDate.getDate() : "0" + startDate.getDate();
		var mStartMonth = startDate.getMonth() + 1;
		mStartMonth = mStartMonth > 9 ? mStartMonth : "0" + mStartMonth;
		var mStartYear = startDate.getFullYear() - 2000;
		var mFinishDay = finishDate.getDate() > 9 ? finishDate.getDate() : "0" + finishDate.getDate();
		var mFinishMonth = finishDate.getMonth() + 1;
		mFinishMonth = mFinishMonth > 9 ? mFinishMonth : "0" + mFinishMonth;
		var mFinishYear = finishDate.getFullYear() - 2000;
		return mStartMonth + "/" + mStartDay + "/" + mStartYear + "->" + mFinishMonth + "/" + mFinishDay + "/" + mFinishYear;
	},

	formatOrderType: function (orderType) {
		return "Type: " + orderType;
	},

	formatCurrency: function (amount) {
		var formatter = sap.ui.core.format.NumberFormat.getCurrencyInstance();
		return formatter.format(amount);
	},

	formatNumber: function (number) {
		if (number && com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oNumberFormatOptions) {
			var numberFormat = sap.ui.core.format.NumberFormat.getFloatInstance(com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oNumberFormatOptions);
			return numberFormat.format(number);
		}
		return "";
	},

	formatPercent: function (amount) {
		var formatter = sap.ui.core.format.NumberFormat.getPercentInstance();
		return formatter.format(amount);
	},

	formatOrderId: function (orderId) {
		if (com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle)
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle.getText("ServiceOrder") + ": " + orderId;
		return orderId;
	},

	formatLastTimeSpentDate: function (sDate) {
		if (sDate && com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle) {
			var formattedDate = com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.formatDate(sDate);
			return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.oResourceBundle.getText("LastTimeSpentDate", formattedDate);
		}
		return "";
	},

	formatAmount: function (amount) {
		if (amount && parseFloat(amount) !== 0)
			return com.amadeus.fiori.ppm.commons.util.CommonFormatter.formatNumber(amount);
		return "";
	},

	formatFacetFilterTitle: function (sKey) {
		return this.getModel("i18n").getResourceBundle().getText("FF" + sKey);
	},

	formatProcessFlowStatus: function (sActualStatus, sReferenceStatus) {
		return [
			{
				state: sActualStatus === sReferenceStatus ? sap.suite.ui.commons.ProcessFlowNodeState.Positive : sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
				value: 10
			}
		];
	},

	formatProcessFlowStatusCRTD: function (sActualStatus) {
		return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.formatProcessFlowStatus(sActualStatus, "CRTD");
	},

	formatProcessFlowStatusREL: function (sActualStatus) {
		return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.formatProcessFlowStatus(sActualStatus, "REL");
	},

	formatProcessFlowStatusTECO: function (sActualStatus) {
		return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.formatProcessFlowStatus(sActualStatus, "TECO");
	},

	formatProcessFlowStatusCLSD: function (sActualStatus) {
		return com.amadeus.fiori.ppm.ipf.deliverables.util.Formatter.formatProcessFlowStatus(sActualStatus, "CLSD");
	},
	inOutBudgetState: function (sValue) {
		if (typeof (sValue) === "undefined") return "Indication04";
		switch (sValue) {
			case "IN":
				return "Indication04";
			case "OUT":
				return "Indication05";
			default:
				return "Indication03";
		}
	},
	priorityState: function (sValue) {
		if (typeof (sValue) === "undefined") return "Warning";
		var aStates = ["None", "Information", "Success", "Warning", "Error"];
		var index = parseInt(sValue);
		return aStates[index];
	}



};