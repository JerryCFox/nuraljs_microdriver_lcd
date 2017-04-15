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
                if(options.method.method=="I2C1"&&options.method.sda&&options.method.scl){
                    method=I2C1.setup({sda:options.method.sda,scl:options.method.scl});
                }
                else if(options.method.method=="I2C2"&&options.method.sda&&options.method.scl){
                    method=I2C2.setup({sda:options.method.sda,scl:options.method.scl});
                }
                else{
                    throw cb(err,"LCD connect method not properly defined");
                }
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
       //console.log("gothere");
        for(var i=0;i<message.split("\n").length;i++){
            //console.log(message.split("\n")[i]);
            lcd.drawString(message.split("\n")[i],2,20+8*i);
        }
   }
   else{
    lcd.drawString(message,2,20);
   }
   lcd.flip();
}
    
