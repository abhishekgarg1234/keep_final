var globalcategory="All";
var keepclass=function(){
	 if(typeof(Storage) !== "undefined") {
		//	localStorage.clear();
		if(localStorage.getItem("feilds")){
			//alert("garfg");
			this.feilds=JSON.parse(localStorage.getItem("feilds"));
			this.notes=JSON.parse(localStorage.getItem("notes"));
			this.colors=JSON.parse(localStorage.getItem("colors"));

		}	
		else{
			//alert("avhu");
			localStorage.setItem('colors','{"color0":"DarkSalmon","color1":"GoldenRod","color2":"IndianRed","color3":"orange","color4":"khaki","color5":"RosyBrown","c6":"LightSteelBlue "}');
			localStorage.setItem('feilds','{"count":1,"c1":"All"}');
			localStorage.setItem('notes','{"count":0,"data":[]}');
			location.reload();
		}
	}
	else{
		alert("not supported");
	}
}
var keep=new keepclass();

var main=function(){
	var t="anj";
	newfeildbutton.addEventListener("click",function(){
	newfeildfunction(); });
	(function(){
		newnote.addEventListener("click",function(){
		newnotefunction(); });
	})();

	function newfeildfunction(){
		$('#newfeildtext').width(169);
		var newfeild=document.getElementById("newfeildtext");
		if(newfeild.value!=""){
			if(keep.notes.count==0){
				globalcategory=newfeild.value;
			}
		var tut=parseInt(keep.feilds["count"])+1;
		var yu="c"+tut;
		keep.feilds[yu]=newfeild.value;
		keep.feilds["count"]=parseInt(tut);
		var t=JSON.stringify(keep.feilds);
		localStorage.setItem("feilds",t);
		$("#newfeildtext").val("");
		}
		else{
			alert("Enter some text.");
		}
		displaycategories();
	}

function displaycategories(){
	//if(localStorage.getItem("keep.notes."))
	document.getElementsByTagName("div")[1].innerHTML="";
	var u=parseInt(keep.feilds["count"]);
	var d = document.createDocumentFragment();
	for (var i=1;i<=u;i++){
		var y1=document.createElement("SPAN");
		y1.setAttribute("class","feildbuttons");
		//y1.setAttribute("style","cursor:pointer");

		//y1.setAttribute("style","font-weight:bold");
		var aa="c"+i;
		var a1=keep.feilds[aa];
		function temp1(x){
			y1.addEventListener("click",function(){
			display(String(x)); });
		}
		temp1(a1);
		var z=document.createTextNode(a1);
		y1.appendChild(z);
		d.appendChild(y1);
		var br=document.createTextNode("       ");
		d.appendChild(br);
		//document.getElementsByTagName("div")[1].appendChild(d);
	}	
	document.getElementsByTagName("div")[1].appendChild(d);
}
$('#newfeildtext').keypress(function() {
	//alert("A");
    var txtWidth = $(this).width();
    var cs = $(this).val().length;

    if(cs>17){
       $(this).width(txtWidth+5);
    }
});
$('#newnotetext').keypress(function(event) {
	//alert("A");
    var txtWidth = $(this).width();
    var cs1 = $(this).val().length;

    if(cs1>17){
       $(this).width(txtWidth+5);
    }

    var txtheight = $(this).height();
   // var cs2 = $(this).val().length;

  /*  if(cs2>17){
       $(this).height(txtheight+5);
    }*/
    if(event.keyCode==13){
    	//alert("enter");
    	  $(this).height(txtheight+10);
    }


});
displaycategories();

	function newnotefunction(){
		$('#newnotetext').width(175);
		$('#newnotetext').height(50);
		var tx=document.getElementById("newnotetext");
		var txt=tx.value;

		txt=escapeHtml(txt.trim()).replace(/\n|\r/g, "<br>");
		//alert(txt);
		var  tempo=txt.split("<br>");
		var title1=tempo[0];
		tempo.shift();
		txt=tempo.join("<br>");
		//alert(txt);



		if(txt!=""){
			var count=parseInt(keep.notes.count+1);
			keep.notes.count=parseInt(count);
			var str='{"id":'+count+',"category":"'+globalcategory+'","color":"DarkSalmon","text":"'+txt+'","checkbox":"false","checkdata":[],"editstatus":"false","title":"'+title1+'"}';
			var xx=JSON.parse(str);
			keep.notes.data.push(xx);			
			var tl=JSON.stringify(keep.notes);
			localStorage.setItem("notes",tl);
			var dd=txt.split("<br>");
				for(var key in dd){
					keep.notes.data[count-1].checkdata.push("false");
				}	
			var tw=JSON.stringify(keep.notes);
			localStorage.setItem("notes",tw);
			$("#newnotetext").val("");
			display(globalcategory);
		}
		else{
			alert("enter some text");
		}
	}

	function display(str){
		globalcategory=str;
		$("#notes").html("<p id='cat'>"+str+"</p>");
		//document.getElementById("notes").innerHTML="<p>"+str+"</p>";
		var htm;
		var droptext1="<select class='dropdown' id=drop"+str;
		var droptext="";
		var tempo=1;
		for(var key in keep.feilds){
			if(tempo==1){
				tempo=2;
			}
			else{
				if(keep.feilds[key]==str){
					droptext += "<option  value="+keep.feilds[key]+" selected>"+keep.feilds[key]+"</option>";
				}
				else{
					droptext += "<option value="+keep.feilds[key]+">"+keep.feilds[key]+"</option>";
				}
			}
		}
		droptext += "</select>";
		
		var cc=parseInt(keep.notes.count);
		//alert("cc");
		for(var i=1;i<=cc;i++){
			var st=keep.notes.data[i-1].category;
			if(st==str){
				if(keep.notes.data[i-1].text==""){
					//alert("aa");
					deletenote(i);break;
					//alert("bb");
					//display(globalcategory);
				}
				var cl=keep.notes.data[i-1].color;
				var colortext1="";/* style='background-color:"+keep.notes.data[i-1].color+"'*/
				var colortext1="<select  class='dropdown' id='color"+cl;
				var colortext="";

				for(var key in keep.colors){
					if(keep.colors[key]==cl){
						colortext += "<option style='background-color:"+keep.colors[key]+";' value="+keep.colors[key]+" selected>"+keep.colors[key]+"</option>";
					}
					else{
						colortext += "<option style='background-color:"+keep.colors[key]+";' value="+keep.colors[key]+">"+keep.colors[key]+"</option>";
					}
				}
				colortext += "</select>";
				var d=document.createDocumentFragment();
				var x=document.createElement("div");
				x.setAttribute("class","nnote");
				var we="noten"+i;
				x.setAttribute("id",we);
				var tr="background-color:"+cl;	
				x.setAttribute("style",tr);
			
				var checkdataa="";var checki=1;
				if(keep.notes.data[i-1].checkbox=="true"){				
					var arr=unescapeHtml(keep.notes.data[i-1].text).split("<br>");
					var length=arr.length;var status=0;
					var checkdataa11="";var checkdataa22="";
					for(var key in arr){
						if(keep.notes.data[i-1].checkdata[status]=="true"){
							checkdataa11 +="<label  id='label"+i+""+checki+"'><input type='checkbox' id='check"+i+""+checki+"' value='"+arr[key]+"' checked><strike>"+arr[key]+"</strike></label><span style='cursor:pointer' title='Delete_task' class='crossmarks' id='cross"+i+""+checki+"'>&nbsp;&nbsp;&nbsp;&#x2718;</span><span style='cursor:pointer' title='Edit_task' class='editmarks' id='edit_task"+i+""+checki+"'>&nbsp;&#x270D;</span></br>";
							checki +=1;status++;
						}
						else{
							checkdataa22 +="<label  id='label"+i+""+checki+"'><input type='checkbox' id='check"+i+""+checki+"' value='"+arr[key]+"'>"+arr[key]+"</label><span style='cursor:pointer' title='Delete_task' class='crossmarks'  id='cross"+i+""+checki+"'>&nbsp;&nbsp;&nbsp;&#x2718;</span><span style='cursor:pointer' title='Edit_task' class='editmarks' id='edit_task"+i+""+checki+"'>&nbsp;&#x270D;</span></br>";
							checki +=1;status++;
						}	
					}
					if(checkdataa11 !=""){
						checkdataa=checkdataa22+"</br><span id='ch' >Completed Tasks</span></br>"+checkdataa11;
					}
					else{
						checkdataa=checkdataa22;
					}
					
					if(keep.notes.data[i-1].editstatus=="true"){
						checkdataa +="<input type='text' id='newedit"+i+"' autofocus><span style='cursor:pointer' id='ok"+i+"'>&#x2714;</span>";
					}
					else{
						checkdataa += "<span style='cursor:pointer' title='Add new task' class='edit' id='edit"+i+"'>&#x271A;</span><br>";
					}
				}
				else{
					var changedtext=keep.notes.data[i-1].text;
					var tt=keep.notes.data[i-1].text;
					var ar1=tt.split("<br>");//var para1=1;
					var temp1="<p style='margin:0px' id='p"+i+"'>"
					var temp2="";
					for(var key in ar1){
						 temp2 += ar1[key]+"<br>";
					}
					temp3="</p>";
					checkdataa=temp1+temp2+temp3;
				}
				var tempcolor="color"+i;		/* style='background-color:"+keep.notes.data[i-1].color+"' */
				htm="<span contenteditable='true' id='titlet"+i+"'><b>"+keep.notes.data[i-1].title+"</b></span><br><br>"+checkdataa+"</br><span title='Delete note' style='cursor:pointer' class='delbuttons' id='del"+i+"'>&#x2716;</span>"+droptext1+i+">"+droptext+colortext1+i+"'>"+colortext+"<button  class='checkbox' id='check"+i+"'>Marks</button>";
				x.innerHTML=htm;
				d.appendChild(x);
				$("#notes").append(d);
				//document.getElementById("notes").appendChild(d);
			
				var delid="del"+i;
				(function(x,i1){
					//console.log(document.getElementById(x));
					var t="#"+x;
					$(t).click(function(){
					deletenote(i1);});
					//document.getElementById(x).addEventListener("click",function(){
					//deletenote(i1);});//alert(i1);
				})(delid,i);

				var newdropid="drop"+str+i;
				(function(x,i1){
					var t="#"+x;
					$(t).change(function(){
						changecategory(i1,x); });
					//document.getElementById(x).addEventListener("change",function(){
					//changecategory(i1,x); });
				})(newdropid,i);
				
				if(keep.notes.data[i-1].checkbox=="false"){
						var paraid="p"+i;//alert(paraid);
						(function(x,i1){
							var t="#"+x;
							$(t).blur(function(){
							changetext(i1,x); });
							//document.getElementById(x).addEventListener("blur",function(){
							//changetext(i1,x); });
						})(paraid,i);
				}
				else{
					var ar4=keep.notes.data[i-1].text.split("<br>");var ty=1;
					for(var key in ar4){
						var ch="check"+i+""+ty;var cr="cross"+i+""+ty;var ed="edit_task"+i+""+ty;
						(function(x,i1,y){//alert(x);
							document.getElementById(x).addEventListener("change",function(){
							changecheckdata(this,i1,y); });
						})(ch,i,ty);

						(function(x,i1,y){//alert(x);
							document.getElementById(x).addEventListener("click",function(){
							delete_task(i1,y); });
						})(cr,i,ty);
						
						(function(x,i1,y){//alert(x);
							document.getElementById(x).addEventListener("click",function(){
							edit_task(i1,y); });
						})(ed,i,ty);
						ty++;
					}
					if(keep.notes.data[i-1].editstatus=="false"){
						var editid="edit"+i;
						(function(x,i1){
							document.getElementById(x).addEventListener("click",function(){
							editnote(x,i1); });
						})(editid,i);//*/
					}
					else{
						var okid="ok"+i;//alert(okid);
						(function(x,i1){
							document.getElementById(x).addEventListener("click",function(){
							okclicked(i1); });
						})(okid,i);
					}
					

				}

				var newdropid2="color"+cl+i;
				(function(x,i1){
					document.getElementById(x).addEventListener("change",function(){
					changecolor(i1,x); });
				})(newdropid2,i);

				var checkid="check"+i;
				(function(x,i1){//alert(x);
					document.getElementById(x).addEventListener("click",function(){
					changecheckstatus(i1); });
				})(checkid,i);	



				var qq="titlet"+i;
				(function(x,i1){
					var t="#"+x;
					$(t).blur(function(){
						changeTitle(i1,x); });
					
				})(qq,i);

//$("#newnotetext").defaultValue="Title";
/*
var wew="#"+we;
alert(wew);
$(wew).on('mouseleave', function(){

	for(var k=1;k<=keep.notes.data[i-1].checkdata.length;k++){
	var cr="#cross"+i+""+k;
	$(cr).hide(500);
	var er="#edit_task"+i+""+k;
	$(er).hide(500);
	
	}
	var dr="#drop"+str+i;
    $(dr).hide(500); 
    var ch="#check"+i; 
    $(ch).hide(500);
    
    
    var de="#del"+i;
    $(de).hide(500);
    var ee="#edit"+i;
    $(ee).hide(500);
//var colo="color"+keep.feilds[i-1]
//$(colo)
   // $('.editmarks').hide(500);
});
$(wew).on('mouseenter', function(){
	for(var k=1;k<=keep.notes.data[i-1].checkdata.length;k++){
	var cr="#cross"+i+""+k;
	$(cr).show(500);
	var er="#edit_task"+i+""+k;
	$(er).show(500);
	
	}
	var dr="#drop"+str+i;
    $(dr).show(500); 
    var ch="#check"+i; 
    $(ch).show(500);
    
    
    var de="#del"+i;
    $(de).show(500);
    var ee="#edit"+i;
    $(ee).show(500);

    $('.dropdown').show(500); 
   $('.checkbox').show(500);
   $('.crossmarks').show(500); 
   $('.delbuttons').show(500);
   $('.edit').show(500); 
   $('.editmarks').show(500);  
});


*/























			}
		}
	}
	display(globalcategory);

	function deletenote(s){
		var x=parseInt(s);
		var count=keep.notes.count;
		keep.notes.count=keep.notes.count-1;
		for(var t=x;t<count;t++){
			keep.notes.data[t-1]=keep.notes.data[t];
			keep.notes.data[t-1].id=t;
		}
		keep.notes.data.pop();
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory)
	}	

	function changecategory(s,str){
		var xw = document.getElementById(str);
		var ww=xw.value;
		console.log(ww);
		var x=parseInt(s)-1;
		keep.notes.data[x].category=ww;
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory);
	}
	function changetext(s,str){
		var xw = document.getElementById(str);
		var ww=xw.innerHTML.replace("<div>", "").replace("</div>","");
		var x=parseInt(s)-1;
		keep.notes.data[x].text=ww;
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory);
	}
	function editnote(str,s){

		keep.notes.data[s-1].editstatus="true";
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
	display(globalcategory);
	}

	function changecolor(s,str){//alert("1");
		var xw = document.getElementById(str);
		var ww=xw.value;
		var x=parseInt(s)-1;
		keep.notes.data[x].color=ww;
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
	display(globalcategory);
	}
	function changecheckstatus(s){
		var x=parseInt(s)-1;
		if(keep.notes.data[x].checkbox=="false"){
			keep.notes.data[x].checkbox="true";
		}
		else{
			keep.notes.data[x].checkbox="false";
			var arr2=keep.notes.data[x].checkdata;var tte=0;
			for(var key in arr2){
				keep.notes.data[x].checkdata[tte]="false";tte++;
			}
		}
		
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
	display(globalcategory);
	}
	function changecheckdata(w,i2,j){
		if(w.checked==true){//alert(i2-1);alert(j);

			keep.notes.data[i2-1].checkdata[j-1]="true";
				var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory);
		}
		else{//alert("r");
			keep.notes.data[i2-1].checkdata[j-1]="false";
			var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory);
		}
	}
	function okclicked(ii){var ss="newedit"+ii;
		var ds=document.getElementById(ss).value;
		keep.notes.data[ii-1].editstatus="false";
		var newtext=keep.notes.data[ii-1].text;
		newtext += "<br>"+ds;
		if(ds != ""){
			keep.notes.data[ii-1].text=newtext;
		}
		else{
			//alert("enter text");
		}
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
	display(globalcategory);

	}
	function delete_task(i,j){
		//alert(j);
		keep.notes.data[i-1].checkdata.splice(j-1,1);
		var x =keep.notes.data[i-1].text;
		var y=x.split("<br>");
		y.splice(j-1,1);
		keep.notes.data[i-1].text=y.join("<br>");
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
	display(globalcategory);

	}
	function edit_task(i,j){
		var labelid="#"+"label"+i+""+j;//alert(labelid);
		var che="#"+"check"+i+""+j;
    	$(labelid).replaceWith( function() {
        return "<input id='tx"+i+""+j+"' type=\"text\" value=\"" + $(che).val() + "\" />";
    	});
    	var temp="#tx"+i+""+j;
    	$(temp).css({"border":"none","outline":"none"});
    	var eid="#edit_task"+i+""+j;//alert(eid);
    	$(eid).replaceWith( function() {
        return "<span style='cursor:pointer'  id='a"+i+""+j+"' >&#x2714;</span>";
    	});var eid2="a"+i+""+j;
    	(function(x,ii,jj){//alert(x);
					document.getElementById(x).addEventListener("click",function(){
					change(x,ii,jj); });
				})(eid2,i,j);

		//alert(j);
		function change(str,i,j){
			var x =keep.notes.data[i-1].text;
		var y=x.split("<br>");
		var as="#tx"+i+""+j;
		y[j-1]=$(as).val();
		var temp=y[j-1];
		keep.notes.data[i-1].text=y.join("<br>");
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		var od="#a"+i+""+j;
		$(od).replaceWith( function() {
        return "<span class='editmarks' id='edit_task"+i+""+j+"'>&nbsp;&#x270D;</span>";
    	});
    	$(as).replaceWith( function() {
        return "<label id='label"+i+""+j+"'><input type='checkbox' id='check"+i+""+j+"' value='"+temp+"'>"+temp+"</label>";
    	});
		display(globalcategory);
		}
		

	}

	function changeTitle(s,str){
		//var xw = document.getElementById(str);
		//var ww=xw.value;
		var we="#titlet"+s;
		var value=$(we).text();
		//console.log(ww);
		var x=parseInt(s)-1;
		//alert(value);
		keep.notes.data[x].title=value;
		var tl=JSON.stringify(keep.notes);
		localStorage.setItem("notes",tl);
		display(globalcategory);
	}
	function escapeHtml(text) {
	  var map = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#039;'
	  };
	  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	}
	function unescapeHtml(text) {
	  return text.replace(/(&lt;)/g,'<').replace(/(&gt;)/g,'>').replace(/(&amp;)/g,'&').replace(/(&quot;)/g,'\"').replace(/(&#039;)/g,'\'');
	}
}
var y=new main();