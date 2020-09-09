$(function () {
    $("#addNewpart").click(function () {
        if ($(this).is(":checked")) {
            $("#addNewApp").removeClass('hideAdvance');
        } else {
            $("#addNewApp").addClass('hideAdvance');
        }
    });
});
/*$('.form-control').addClass('required');*/
$('input[type="date"]').datetimepicker({
    timepicker:false
});
$('#demo1,#demo2,#demo3,#demo4,#demo5,#demo6,#demo7').datetimepicker({
    timepicker:false,
    format:'d/m/Y',
    formatDate:'Y/m/d'
});
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(document).ready(function() {
    $('a[href="#finish"]').click(function(){
        $("#submitForm").trigger('click');
    });
});
/*  
$(function() {
     $('a[href="#finish"]').click(function() {
     $('#result').text(JSON.stringify($('form').serializeObject()));
     return false;
});
});
*/

$(window).on('load', function() { 
    //$(".wpb_loader").fadeOut(1000); 
    $(".wpb_loader").animate({top: '-1600px'},1000);
});



setTimeout(function(){ 
    getCurrentAndNextYear()
    LoopYears();
    LoopMonths();


}, 1000);






function getyearMonthCount(mid,txt,limit){
    var text = "";  var j;
    for (var j = 0; j <= limit; j++) {
        if(j > 1){
            text += "<option value="+ j +">"+ j +" "+txt+"s</option>";
        }else{
            text += "<option value="+ j +">"+ j +" "+txt+"</option>";
        }
    }
    document.getElementById(mid).innerHTML = text;
}

function LoopMonths(){
    var Months = ["countMonths","countMonths2","countMonths3","countMonths4","countMonths5"];
    /* $("select").each(function () {
             console.log($(this).attr("id"));
    });*/
    for(var i = 0; i < Months.length; i++){
        getyearMonthCount(Months[i],'Month',11);
        //console.log(Months[i]);
    }

}

function LoopYears(){ 
    var Years = ["countYear","countYear2","countYear3","countYear4","countYear5"];
    for(var i = 0; i < Years.length; i++){
        getyearMonthCount(Years[i],'Year',5);
        //console.log(Years[i]);
    }

}


function getCurrentAndNextYear(){
    var start = new Date().getFullYear();
    var end = new Date().getFullYear()+1;
    var opt = "";

    for(var year = start ; year <= end; year++){
        opt += "<option value="+ year +">"+ year +"</option>";
    }
    document.getElementById("getCurrentAndNextYear").innerHTML = opt;

}









function smoothScrollJs(){
    $(document).ready(function(){
        $("a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: 20
                }, 400, function(){
                    window.location.hash = hash;  
                });
            } 
        });
    });
}

// Jquery Dependency

$("input[data-type='currency']").on({
    keyup: function() {
        formatCurrency($(this));
    },
    blur: function() { 
        formatCurrency($(this), "blur");
    }
});

function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    var input_val = input.val();
    if (input_val === "") { return; }
    var original_len = input_val.length;
    var caret_pos = input.prop("selectionStart");
    if (input_val.indexOf(".") >= 0) {
        var decimal_pos = input_val.indexOf(".");
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);
        left_side = formatNumber(left_side);
        right_side = formatNumber(right_side);
        if (blur === "blur") {
            right_side += "00";
        }
        right_side = right_side.substring(0, 2);
        input_val = left_side + "." + right_side;
    } else {
        input_val = formatNumber(input_val);
        input_val = "" + input_val;
        if (blur === "blur") {
            input_val += ".00";
        }
    }
    input.val(input_val);
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}





/* PAYMENT SECTION */
function getSubTotal(ammountone,ammounttwo){
    return  parseFloat(ammountone) + parseFloat(ammounttwo);
}
function getAmountpayable(subtotal,deddeposit){
    return parseFloat(subtotal) - parseFloat(deddeposit);
}
$('#fpaymeny,#rentbond').on('change', function() { 
    var fpaymeny = $('#fpaymeny').val();
    var rentbond = $('#rentbond').val();
    var subtotal = getSubTotal(fpaymeny.replace(",",""),rentbond.replace(",",""));

    $("#subtotal").val(subtotal+".00");
});
$('#deddeposit').on('change', function() {
    var subtotall = $("#subtotal").val();
    var deddeposit = $("#deddeposit").val();
    var ammpayabe =  getAmountpayable(subtotall.replace(",",""),deddeposit.replace(",",""));
    $("#ammpayabe").val(ammpayabe + ".00");
});



 




