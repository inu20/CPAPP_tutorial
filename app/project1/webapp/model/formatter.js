sap.ui.define(function () {
	"use strict";

    function number_format (number, decimals, dec_point, thousands_sep) {
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

	return {

		weightState: function (fMeasure, sUnit) {

			// Boundary values for different statuses of weight
			var fMaxWeightSuccess = 1;
			var fMaxWeightWarning = 5;
			var fAdjustedMeasure = parseFloat(fMeasure);

			// if the value of fMeasure is not a number, no status will be set
			if (isNaN(fAdjustedMeasure)) {
				return "None";
			} else {

				if (sUnit === "G") {
					fAdjustedMeasure = fMeasure / 1000;
				}

				if (fAdjustedMeasure < 0) {
					return "None";
				} else if (fAdjustedMeasure < fMaxWeightSuccess) {
					return "Success";
				} else if (fAdjustedMeasure < fMaxWeightWarning) {
					return "Warning";
				} else {
					return "Error";
				}
			}
		},

        number_shorten: function (iInt, iPrecision){
            iInt = parseInt(iInt.replace(',',''));
            iPrecision = iPrecision || 0; // Default precision is 0

            var aSuffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'],
                iIndex = parseInt(Math.log(Math.abs( iInt ), 1000));
                iIndex = Math.max(0, Math.min( aSuffixes.length - 1, iIndex)); // Clamps to a valid suffixes' index
            
            return number_format( iInt / 1000 ** iIndex, iPrecision)+( aSuffixes[iIndex] || '');
        }
	};

});