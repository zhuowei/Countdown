function countDown(date1, date2){
	delta=date2-date1;
	dateDiff=fromMS(Math.abs(delta));
	return dateDiff.years + " Years, " + dateDiff.weeks + " weeks, " + dateDiff.days + " days,  " + dateDiff.hours + " hours, " +
		dateDiff.minutes + " minutes, and " + dateDiff.seconds + " seconds " + 
		((delta>=0)? "until": "since ");
}
function fromMS(msec){
	var sec=msec/1000;
	var retval={};
	retval["years"]=Math.floor(sec/60/60/24/365);
	sec-=retval["years"]*60*60*24*365;
	retval["weeks"]=Math.floor(sec/60/60/24/7);
	sec-=retval["weeks"]*60*60*24*7;
	retval["days"]=Math.floor(sec/60/60/24);
	sec-=retval["days"]*60*60*24;
	retval["hours"]=Math.floor(sec/60/60);
	sec-=retval.hours*60*60;
	retval["minutes"]=Math.floor(sec/60);
	sec-=retval.minutes*60;
	retval["seconds"]=Math.floor(sec);
	return retval;
}

var licenseText="Copyright (C) 2011 Zhuowei Zhang<br/>" + 
    "<p>This program is free software: you can redistribute it and/or modify "+
    "it under the terms of the GNU General Public License as published by "+
    "the Free Software Foundation, either version 3 of the License, or "+
    "(at your option) any later version.</p>"+

    "<p>This program is distributed in the hope that it will be useful, "+
    "but WITHOUT ANY WARRANTY; without even the implied warranty of "+
    "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the "+
    "GNU General Public License for more details.</p>"+

    "<p>You should have received a copy of the GNU General Public License "+
    "along with this program.  If not, see <a href=\"javascript:window.open('http://www.gnu.org/licenses/');\">http://www.gnu.org/licenses/</a></p>";

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: true,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
       var showAbout=function(){
		var box=Ext.Msg.show({title: "About", 
			msg: "Countdown 1.0<br/>By Zhuowei Zhang<br/>"+licenseText,
			icon: Ext.MessageBox.INFO
		});
		box.setWidth(window.innerWidth*0.7);
	};
       var countDownDatePick=function(datePicker){
		var adate=datePicker.getValue();
		var hours=parseInt(prompt("Please enter the hour, in 24-hr format, for the countdown date.\n" + 
						"For example: 14"));
		var minutes=parseInt(prompt("please enter the minute for the countdown time."));
		if(!isNaN(hours)&&!isNaN(minutes)){
			adate.setHours(hours, minutes);
		}
		else{
			Ext.Msg.alert("That's not a valid date.","please try again.", Ext.emptyFn);
			return;
		}
		var myName=prompt("Please enter a name for this countdown: ");
		var countDownObj=Ext.ModelMgr.create({date:adate, eventName:myName}, "Countdown");
		countDownObj.save();	
	    	countdownList.store.add(countDownObj);

	    };
	var addCountdown=function(btn, event){
	    var datePicker=new Ext.DatePicker({
		useTitles: true,
		yearFrom: new Date().getFullYear(),
		yearTo: new Date().getFullYear()+30,
	    });
	    datePicker.on("change", function(dp, cv){setTimeout(countDownDatePick, 100, dp);});
	    datePicker.show();

        };	    

	var dockedItems = new Ext.Toolbar({
		dock: 'bottom',
		xtype: 'toolbar',
		items: [{text: "About" , handler: showAbout}, {xtype: 'spacer'}, {text: "add", 
		   handler: addCountdown,
		}]
	});
        var countdownList = new Ext.DataView({
	emptyText: "You have nothing to look forward to. Click the Add button to add a countdown.",
    	store: new Ext.data.Store({
		model: 'Countdown',
		autoLoad: true,
		autoSave: true
	}),
	tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="countdownselect">',
                '<div class="countdowntime">{[countDown(new Date(), values.date)]}</div>',
		'<div class="countdowntotime">{date}</div>',
                '<div class="countdownname">{eventName}</div>',
            '</div>',
        '</tpl>'
    	),
    	fullscreen: true,
        itemSelector:'div.countdownselect'
	});
	countdownList.on("itemTap", function(cdList, index, item, e){
		Ext.Msg.confirm("Delete", "Would you like to delete this countdown?", 
			function(e){if(e=="yes"){countdownList.store.removeAt(index);countdownList.store.sync();}}, this);
	});
	//countdownList.store.load();
	var refreshCountdown=function(){
		countdownList.refresh();
	}
        new Ext.Panel({
            fullscreen: true,
            dockedItems: dockedItems,
	   items:[countdownList]
        });
	setInterval(refreshCountdown,1000);
    }
});
