module.exports.init=init;
module.exports.log=log;

var lcd_header="NuralJS";
var lcd=0;
var method;
var err=null;

function init(options,cb){
    if(options){
        if(options.lcd){
            lcd=options.lcd
            if(options.method){
                method=options.method;
                lcd=lcd.connect(method,function started(){
                    lcdWrite("LCD ENABLED");
                    cb(err,"LCD Ready");
                });
            }
            else{
                cb(err,"No LCD Method Supplied, LCD Disabled");
            };
        };
    }
    else{
        cb(err,"LCD Disabled");
    }
}

function log(message){
    if(lcd){
        lcdWrite(message);
    };
}

function lcdWrite(message){
   lcd.clear();
   lcd.setFontVector(12);
   lcd.drawString(lcd_header,2,2);
   lcd.setFontBitmap();
   if(message.indexOf("\n")){
        for(var i=0;i<message.split("\n").length;i++){
            console.log(message.split("\n")[i]);
            lcd.drawString(message.split("\n")[i],2,20+10*i);
        }
   }
   else{
    lcd.drawString(message,2,20);
   }
   lcd.flip();
}
    
