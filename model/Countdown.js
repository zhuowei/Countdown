Ext.regModel("Countdown",{
	fields:[
		"id", 
		{name: "date", type: "date"}, 
		{name: "eventName", type: "string"}
	],
	proxy: {
		type: 'localstorage',
		id: "countdown-store"
	},
});
