const os = require('os');
let localhost;
let portm = 19138;
try {
    var network = os.networkInterfaces()
    localhost = network[Object.keys(network)[0]][1].address
} catch (e) {
    localhost = 'localhost'
}

const Websocket = require("ws");
const wss = new Websocket.Server({port:portm});
console.log('加载成功');
console.log("请在游戏内输入 /connect " + localhost + ":%s.", portm);
let r = 10;//默认图形半径
wss.on("connection" , function connection(ws) {
	
	function command(cmd){
		ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": "add538f2-94c1-422b-8334-41fa5e8778c9",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	ws.send(JSON.stringify({
		"body": {
			"eventName": "PlayerMessage"
		},
		"header": {
			"requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",
			"messagePurpose": "subscribe",
			"version": 1,
			"messageType": "commandRequest"
		}
	}));
 	function inf(msg) {
		command("say " + msg);
	}
	
	function drawLine(pstart, pend,z){
    var slope; //斜率
    var noSlope = false; //是否有斜率
    var hdist = pend[0] - pstart[0];
    var vdist = pend[1] - pstart[1];
    if(hdist != 0){
        slope =  Math.abs(vdist/hdist);  //计算斜率
    }else{
        noSlope = true; //当hdist=0时，直线没有斜率
    }
    var diagonal = Math.sqrt(Math.pow(hdist,2) + Math.pow(vdist,2)); //斜边长度
    var pn = parseInt(diagonal/1); //计算两点之间的点的数量
    if(pn < 3){pn=pn*3+1}; //如果点的数量小于3，则加大点数；为什么+1呢，是保证pn=0时至少有一个点
    var vgap = Math.abs(vdist)/pn; //相邻两点间的垂直距离
    var hgap = Math.abs(hdist)/pn; //相邻两点间的水平距离
    for(var i = 0; i< pn ; i++){
        drawpoint((hgap*i*(pend[0]<pstart[0]?-1:1)*(noSlope?0:1)+pstart[0]),(vgap*i*(pend[1]<pstart[1]?-1:1)+pstart[1]),z);
    }
}
       function drawpoint(x,y,z){
		//console.log("summon snowball ~"+x+" ~"+y+" ~"+z);
		command("summon snowball ~"+x+" ~"+y+" ~"+z);
		//command("setblock ~"+x+" ~"+y+" ~"+z+" glass");
	}

	function sleep(numberMillis) { 
		var now = new Date(); 
		var exitTime = now.getTime() + numberMillis; 
		while (true) { 
			now = new Date(); 
			if (now.getTime() > exitTime) return; 
		} 
	}
	
	inf("功能:d c‖p‖s\n请先在游戏中使用命令方块固定好雪球.");
	ws.on("message" , function coming(message) {
		//console.log('received: %s', message); 
		if (JSON.parse(message).body.eventName == "PlayerMessage") {
			console.log("<%s> %s", JSON.parse(message).body.properties.Sender, JSON.parse(message).body.properties.Message);
			var player_command = JSON.parse(message).body.properties.Message;
			if(player_command.substring(0,1) == "*"){
				if(player_command.substring(1,6)=="dcube"){
					var bian = player_command.substring(7,player_command.length);
				for(var times=0; times<bian; times++) { 
					sleep(30);
 					var x1 = (Math.sin(times*Math.PI*2/bian)*r).toFixed(14); 
					var y1 = (Math.cos(times*Math.PI*2/bian)*r).toFixed(14); 
					drawpoint(x1,y1,5);
					//command("summon snowball ~"+x1+" ~"+y1+" ~2"); 
					var x2 = (Math.sin((times+1)*Math.PI*2/bian)*r).toFixed(14); 
					var y2 = (Math.cos((times+1)*Math.PI*2/bian)*r).toFixed(14); 
					drawLine([parseFloat(x1),parseFloat(y1)],[parseFloat(x2),parseFloat(y2)],5);
				} 
				for(var t=5;t<=18;t=t+1){
				for(var times=0; times<bian; times++) { 
					sleep(30);
 					var x1 = (Math.sin(times*Math.PI*2/bian)*r).toFixed(14); 
					var y1 = (Math.cos(times*Math.PI*2/bian)*r).toFixed(14); 
					drawpoint(x1,y1,t);
				} 
				}
				for(var times=0; times<bian; times++) { 
					sleep(30);
 					var x1 = (Math.sin(times*Math.PI*2/bian)*r).toFixed(14); 
					var y1 = (Math.cos(times*Math.PI*2/bian)*r).toFixed(14); 
					drawpoint(x1,y1,18);
					//command("summon snowball ~"+x1+" ~"+y1+" ~2"); 
					var x2 = (Math.sin((times+1)*Math.PI*2/bian)*r).toFixed(14); 
					var y2 = (Math.cos((times+1)*Math.PI*2/bian)*r).toFixed(14); 
					drawLine([parseFloat(x1),parseFloat(y1)],[parseFloat(x2),parseFloat(y2)],18);
				} 
				inf(bian+"棱柱已完成");
				}
			switch(player_command.substring(1,3)){
				case "cl":
				inf("\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§\n§r.");
				break;
				case "dp":
				var bian = player_command.substring(4,player_command.length);
				for(var times=0; times<bian; times++) { 
					sleep(50);
 					var x1 = (Math.sin(times*Math.PI*2/bian)*r).toFixed(15); 
					var y1 = (Math.cos(times*Math.PI*2/bian)*r).toFixed(15); 
					//command("summon snowball ~"+x1+" ~"+y1+" ~2"); 
					var x2 = (Math.sin((times+1)*Math.PI*2/bian)*r).toFixed(15); 
					var y2 = (Math.cos((times+1)*Math.PI*2/bian)*r).toFixed(15); 
					drawLine([parseFloat(x1),parseFloat(y1)],[parseFloat(x2),parseFloat(y2)]);
				} 
				inf(bian+"边形已完成");
				break;
				case "ds":
				var R = r/2;
				var bian = player_command.substring(4,player_command.length);
				for(var times=0;times<bian;times++){
					sleep(50);
					var x0 = (Math.sin(times*2/bian*Math.PI)*r).toFixed(15);
					var y0 = (Math.cos((times*2/bian)*Math.PI)*r).toFixed(15);
					var x1 = (Math.sin((times+1/2)*2/bian*Math.PI)*R).toFixed(15);
					var y1 = (Math.cos((times+1/2)*(360/bian)*Math.PI/180)*R).toFixed(15);
					var x2 = (Math.sin((times+1)*(360/bian)*Math.PI/180)*r).toFixed(15);
					var y2 = (Math.cos((times+1)*(360/bian)*Math.PI/180)*r).toFixed(15);
					drawLine([parseFloat(x0),parseFloat(y0)],[parseFloat(x1),parseFloat(y1)]);
					sleep(50);
					drawLine([parseFloat(x1),parseFloat(y1)],[parseFloat(x2),parseFloat(y2)]);
				}
				inf(bian+"角星已完成");
				break;
				case "de":
				var rl = player_command.substring(4,player_command.length);
				if(rl<=2)break;
				var rs = rl - 2;
				for(var times=0; times<120; times++) { 
					sleep(50);
 					var x1 = (Math.sin(times*Math.PI/60)*rl).toFixed(14); 
					var y1 = (Math.cos(times*Math.PI/60)*rs).toFixed(14); 
					drawpoint(x1,y1,5);
				} 
				inf("椭圆已完成");
				break;
			}
			}
		 if(player_command == "close") command("closewebsocket");
		}
	});
});
