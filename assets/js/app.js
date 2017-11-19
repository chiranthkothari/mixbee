$(document).ready(function() {
	$('select').material_select();
});
function update(value){
	var gradeOfConcrete= Number(document.getElementById('grade_concrete').value);

	//standard deviation
	var stdDev= document.getElementById('std_dev');
	var degreeSup= document.getElementById('degree_sup').value;
	if(degreeSup==1){
		if(gradeOfConcrete<=17){
			stdDev.value= 3.5;
		}
		else if(gradeOfConcrete<=27){
			stdDev.value= 4;
		}
		else{
			stdDev.value= 5;
		}
	}
	else if(degreeSup==2){
		if(gradeOfConcrete<=17){
			stdDev.value= 4.5;
		}
		else if(gradeOfConcrete<=27){
			stdDev.value= 5;
		}
		else{
			stdDev.value= 6;
		}
	}


	var targetComp= document.getElementById('target_comp');
	var tc_temp= gradeOfConcrete+(1.65*stdDev.value);
	targetComp.value= tc_temp.toFixed(2);  //should be entered before pressing calculate

	//max w/c ratio
	var typeOfConcrete= document.getElementById('type_of_concrete').value;
	var exposureCondition= document.getElementById('exposure_condition').value;
	var maxWC= document.getElementById('max_wc');

	if( (typeOfConcrete==0) && (exposureCondition==0) ){
		maxWC.value= 0.55;
	}
	else if((typeOfConcrete==0) && (exposureCondition==1)){
        maxWC.value= 0.5;
	}
	else if((typeOfConcrete==0) && (exposureCondition==2)){
        maxWC.value= 0.45;
	}
	else if((typeOfConcrete==0) && (exposureCondition==3)){
        maxWC.value= 0.45;
	}
	else if((typeOfConcrete==0) && (exposureCondition==4)){
        maxWC.value= 0.4;
	}
	else if((typeOfConcrete==1) && (exposureCondition==0)){
        maxWC.value= 0.6;
	}
	else if((typeOfConcrete==1) && (exposureCondition==1)){
        maxWC.value= 0.6;
	}
	else if((typeOfConcrete==1) && (exposureCondition==2)){
        maxWC.value= 0.5;
	}
	else if((typeOfConcrete==1) && (exposureCondition==3)){
        maxWC.value= 0.45;
	}
	else if((typeOfConcrete==1) && (exposureCondition==4)){
        maxWC.value= 0.4;
	}

	//adopt wc
	var adoptWC= document.getElementById('adopt_wc');
	adoptWC.value= maxWC.value;

	//max-nominal
	var maxNominal= document.getElementById('max_nominal').value;
	var maxWater= document.getElementById('max_water');
	if(maxNominal==10){
		maxWater.value=208;
	}
	else if(maxNominal==20){
		maxWater.value=186;
	}
	else if(maxNominal==40){
		maxWater.value=165;
	}
    
    //Reduction due to type of coarse aggregates 
    var typeCoarse= document.getElementById('type_coarse').value;
    var reductionDueToCA= document.getElementById('red_ca');
    if(typeCoarse==0){
    	reductionDueToCA.value=0;
    }
    else if(typeCoarse==1){
    	reductionDueToCA.value=10;
    }
    else if(typeCoarse==2){
    	reductionDueToCA.value=20;
    }
    else if(typeCoarse==3){
    	reductionDueToCA.value=25;
    }
    

    //Display hide
    var useCA= document.getElementById('use_ca').value;
    if (useCA==0) {
    	document.getElementById('dis-dep').style.display = "none";
    }
    else{
    	document.getElementById('dis-dep').style.display = "block";
    }


    //Increament due to workability
    var increamentWorkability= document.getElementById('increament_workability');
    var workabilityJS= Number(document.getElementById('workability').value);
    var iw_temp= (((workabilityJS-50)/25)*3)*(maxWater.value/100);
    increamentWorkability.value= iw_temp.toFixed(2);

    //Net water content
    var netWater= document.getElementById('net_water');
    netWater.value= Number(maxWater.value) + Number(increamentWorkability.value) - Number(reductionDueToCA.value);

    //Resulting WC after Reduction due to admixture
    var volAdmix= document.getElementById('vol_admix').value;
    var resultingWC= document.getElementById('resulting_wc');
    var perRedWater= document.getElementById('per_red_water').value;
    if(volAdmix==0){
    	resultingWC.value= netWater.value;
    }
    else{
    	resultingWC.value= ((100 - Number(perRedWater))*(netWater.value/100)).toFixed(2);
    }

    //Cement content as per w/c ratio
    var ccWc= document.getElementById('cc_wc');
    ccWc.value= (resultingWC.value/adoptWC.value).toFixed(2);

    //Minimum Cement content as per IS 456 
    var minCement= document.getElementById('min_cement');
    if( (typeOfConcrete==0) && (exposureCondition==0) ){
		minCement.value= 300;
	}
	else if((typeOfConcrete==0) && (exposureCondition==1)){
        minCement.value= 300;
	}
	else if((typeOfConcrete==0) && (exposureCondition==2)){
        minCement.value= 320;
	}
	else if((typeOfConcrete==0) && (exposureCondition==3)){
        minCement.value= 340;
	}
	else if((typeOfConcrete==0) && (exposureCondition==4)){
        minCement.value= 360;
	}
	else if((typeOfConcrete==1) && (exposureCondition==0)){
        minCement.value= 220;
	}
	else if((typeOfConcrete==1) && (exposureCondition==1)){
        minCement.value= 240;
	}
	else if((typeOfConcrete==1) && (exposureCondition==2)){
        minCement.value= 250;
	}
	else if((typeOfConcrete==1) && (exposureCondition==3)){
        minCement.value= 260;
	}
	else if((typeOfConcrete==1) && (exposureCondition==4)){
        minCement.value= 280;
	}

	//Cement content
	var cemCon= document.getElementById('cem_con');
	cemCon.value= Math.max(minCement.value, ccWc.value);


	// Volume of coarse aggregates per unit total aggregates
	var volCaTotalAgg= document.getElementById('vol_ca_total_agg');
	var zonejs= document.getElementById('zone').value;
	if((maxNominal==10) && (zonejs==0)){
		volCaTotalAgg.value= 0.44;
	}
	else if((maxNominal==10) && (zonejs==1)){
		volCaTotalAgg.value= 0.46;
	}
	else if((maxNominal==10) && (zonejs==2)){
		volCaTotalAgg.value= 0.48;
	}
	else if((maxNominal==10) && (zonejs==3)){
		volCaTotalAgg.value= 0.5;
	}
	else if((maxNominal==20) && (zonejs==0)){
		volCaTotalAgg.value= 0.60;
	}
	else if((maxNominal==20) && (zonejs==1)){
		volCaTotalAgg.value= 0.62;
	}
	else if((maxNominal==20) && (zonejs==2)){
		volCaTotalAgg.value= 0.64;
	}
	else if((maxNominal==20) && (zonejs==3)){
		volCaTotalAgg.value= 0.66;
	}
	else if((maxNominal==40) && (zonejs==0)){
		volCaTotalAgg.value= 0.69;
	}
	else if((maxNominal==40) && (zonejs==1)){
		volCaTotalAgg.value= 0.71;
	}
	else if((maxNominal==40) && (zonejs==2)){
		volCaTotalAgg.value= 0.73;
	}
	else if((maxNominal==40) && (zonejs==3)){
		volCaTotalAgg.value= 0.75;
	}


	//Volume change due to workability
	var caVolChangeWorkability= document.getElementById('ca_vol_change_workability');
	var temp1= Number(((0.5 - adoptWC.value)/0.05)*0.01);
	var temp2= (temp1)+Number(volCaTotalAgg.value);
	caVolChangeWorkability.value= temp2;

	//Max. reduction in CA (%) due to pumpable concrete
	var maxRedPump= document.getElementById('max_red_pump');
	var methodPlacing= document.getElementById('method_placing').value;
	if(methodPlacing==0){
		maxRedPump.value= 10;
	}
	else{
		maxRedPump.value=0;
	}

	//Volume of coarse aggregates
	var vcajs= document.getElementById('vca');
	vcajs.value= caVolChangeWorkability.value*(1-(maxRedPump.value/100));

	//Volume of fine aggregates
	var vfajs= document.getElementById('vfa');
	vfajs.value= (1-vcajs.value).toFixed(2);


	//Results
	var a= document.getElementById('sgcem').value;
	var b= Number(cemCon.value)/(1000*Number(a)); //Volume of Cement
	var c= resultingWC.value/1000; //Volume of Water
	var e= document.getElementById('sgadmix').value;
	var d= ((Number(volAdmix)*Number(cemCon.value))/100)/(1000*Number(e)); //Volume of chemical Admixture
	var f= 1- (Number(b)+Number(c)+Number(d)); //Volume of all aggregates
	var g= document.getElementById('sgca').value;
	var h= Number(f)*Number(vcajs.value)*Number(g)*1000; //Mass of coarse aggregates
	var i= document.getElementById('sgfa').value;
	var j= Number(i)*Number(vfajs.value)*Number(f)*1000; //Mass of fine aggregates
	var myTable= document.getElementById('results_table');
	var cemResult=   myTable.rows[1].cells[1].innerHTML= Number(cemCon.value).toFixed(0);
	var waterResult= myTable.rows[2].cells[1].innerHTML= Number(resultingWC.value).toFixed(0);
	var faResult=    myTable.rows[3].cells[1].innerHTML= Number(j).toFixed(0);
	var caResult=    myTable.rows[4].cells[1].innerHTML= Number(h).toFixed(0);
	var admResult=   myTable.rows[5].cells[1].innerHTML= ((Number(volAdmix)*Number(cemCon.value))/100).toFixed(2);
	myTable.rows[6].cells[1].innerHTML= (Number(waterResult)/Number(cemResult)).toFixed(3);
	myTable.rows[1].cells[2].innerHTML= (Number(cemResult)/(Number(a)*100)).toFixed(3);
	myTable.rows[2].cells[2].innerHTML= (Number(waterResult)/100).toFixed(2);
	myTable.rows[3].cells[2].innerHTML= (Number(faResult)/(Number(i)*100)).toFixed(3);
	myTable.rows[4].cells[2].innerHTML= (Number(caResult)/(Number(g)*100)).toFixed(3);
	myTable.rows[5].cells[2].innerHTML= (Number(admResult)/(Number(e)*100)).toFixed(3);
}

function mixbee(){
	update();
}
