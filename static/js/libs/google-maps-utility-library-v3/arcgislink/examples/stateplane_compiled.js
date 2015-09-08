(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var j,k=Math.PI/180,aa=0;window.ags_jsonp=window.ags_jsonp||{};var l=google.maps,m,n,o,p={$:null,R:false},q={},r={};function s(a,b,c){var d=b===""?0:a.indexOf(b);return a.substring(d+b.length,c===""?a.length:a.indexOf(c,d+b.length))}function t(a){return a&&typeof a==="string"}function u(a,b,c){if(a&&b){var d;for(d in a)if(c||!(d in b))b[d]=a[d]}return b}function v(){l.event.trigger.apply(this,arguments)}
function ba(a,b){var c="";if(a)c+=a.getTime()-a.getTimezoneOffset()*6E4;if(b)c+=", "+(b.getTime()-b.getTimezoneOffset()*6E4);return c}function y(a,b){b=Math.min(Math.max(b,0),1);if(a){var c=a.style;if(typeof c.opacity!=="undefined")c.opacity=b;if(typeof c.filters!=="undefined")c.filters.alpha.opacity=Math.floor(100*b);if(typeof c.filter!=="undefined")c.filter="alpha(opacity:"+Math.floor(b*100)+")"}}
function ca(a){var b="";for(var c in a)if(a.hasOwnProperty(c)){if(b.length>0)b+=";";b+=c+":"+a[c]}return b}function da(){if(typeof XMLHttpRequest==="undefined"){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(c){}throw new Error("This browser does not support XMLHttpRequest.");}else return new XMLHttpRequest}
var z="esriGeometryPoint",A="esriGeometryMultipoint",B="esriGeometryPolyline",C="esriGeometryPolygon",D="esriGeometryEnvelope";
function ea(a){var b=a;if(a&&a.splice&&a.length>0)b=a[0];if(b instanceof l.LatLng||b instanceof l.Marker)return a&&a.splice&&a.length>1?A:z;else if(b instanceof l.Polyline)return B;else if(b instanceof l.Polygon)return C;else if(b instanceof l.LatLngBounds)return D;else if(b.x!==undefined&&b.y!==undefined)return z;else if(b.points)return A;else if(b.paths)return B;else if(b.rings)return C;return null}
function E(a){var b=a;if(a&&a.splice&&a.length>0)b=a[0];if(b&&b.splice&&b.length>0)b=b[0];if(b instanceof l.LatLng||b instanceof l.Marker||b instanceof l.Polyline||b instanceof l.Polygon||b instanceof l.LatLngBounds)return true;return false}function F(a,b){for(var c=[],d,e=0,f=a.getLength();e<f;e++){d=a.getAt(e);c.push("["+d.lng()+","+d.lat()+"]")}b&&c.length>0&&c.push("["+a.getAt(0).lng()+","+a.getAt(0).lat()+"]");return c.join(",")}
function G(a){var b=q[a.spatialReference.wkid||a.spatialReference.wkt];b=b||m;var c=b.n([a.xmin,a.ymin]);a=b.n([a.xmax,a.ymax]);return new l.LatLngBounds(new l.LatLng(c[1],c[0]),new l.LatLng(a[1],a[0]))}
function H(a){var b;if(typeof a==="object")if(a&&a.splice){b=[];for(var c=0,d=a.length;c<d;c++)b.push(H(a[c]));return"["+b.join(",")+"]"}else if(E(a)){var e;d="{";switch(ea(a)){case z:e=a&&a.splice?a[0]:a;if(e instanceof l.Marker)e=e.getPosition();d+="x:"+e.lng()+",y:"+e.lat();break;case A:c=[];for(b=0;b<a.length;b++){e=a[b]instanceof l.Marker?a[b].getPosition():a[b];c.push("["+e.lng()+","+e.lat()+"]")}d+="points: ["+c.join(",")+"]";break;case B:c=[];a=a&&a.splice?a:[a];for(b=0;b<a.length;b++)c.push("["+
F(a[b].getPath())+"]");d+="paths:["+c.join(",")+"]";break;case C:c=[];e=a&&a.splice?a[0]:a;a=e.getPaths();for(b=0;b<a.getLength();b++)c.push("["+F(a.getAt(b),true)+"]");d+="rings:["+c.join(",")+"]";break;case D:e=a&&a.splice?a[0]:a;d+="xmin:"+e.getSouthWest().lng()+",ymin:"+e.getSouthWest().lat()+",xmax:"+e.getNorthEast().lng()+",ymax:"+e.getNorthEast().lat();break}d+=", spatialReference:{wkid:4326}";d+="}";return d}else if(a.toJSON)return a.toJSON();else{b="";for(c in a)if(a.hasOwnProperty(c)){if(b.length>
0)b+=", ";b+=c+":"+H(a[c])}return"{"+b+"}"}return a.toString()}function I(a){var b="";if(a){a.f=a.f||"json";for(var c in a)if(a.hasOwnProperty(c)&&a[c]!==null&&a[c]!==undefined){var d=H(a[c]);b+=(b.length>0?"&":"")+(c+"="+(escape?escape(d):encodeURIComponent(d)))}}return b}
function J(a,b,c,d){var e="ags_jsonp_"+aa++ +"_"+Math.floor(Math.random()*1E6),f=null;b=b||{};b[c||"callback"]="ags_jsonp."+e;b=I(b);var g=document.getElementsByTagName("head")[0];if(!g)throw new Error("document must have header tag");window.ags_jsonp[e]=function(){window.ags_jsonp[e]&&delete window.ags_jsonp[e];f&&g.removeChild(f);f=null;d.apply(null,arguments);v(r,"jsonpend",e)};if((b+a).length<2E3&&!p.R){f=document.createElement("script");f.src=a+(a.indexOf("?")===-1?"?":"&")+b;f.id=e;g.appendChild(f)}else{c=
window.location;c=c.protocol+"//"+c.hostname+(!c.port||c.port===80?"":":"+c.port+"/");var i=true;if(a.toLowerCase().indexOf(c.toLowerCase())!==-1)i=false;if(p.R)i=true;if(i&&!p.$)throw new Error("No proxyUrl property in Config is defined");var h=da();h.onreadystatechange=function(){if(h.readyState===4)if(h.status===200)eval(h.responseText);else throw new Error("Error code "+h.status);};h.open("POST",i?p.$+"?"+a:a,true);h.setRequestHeader("Content-Type","application/x-www-form-urlencoded");h.send(b)}v(r,
"jsonpstart",e);return e}r.ja=function(a,b,c,d){J(a,b,c,d)};r.Q=function(a,b){if(b&&b.splice)for(var c,d=0,e=b.length;d<e;d++)if((c=b[d])&&c.splice)r.Q(a,c);else E(c)&&c.setMap(a)};r.la=function(a,b){r.Q(null,a);if(b)a.length=0};function K(a){a=a||{};this.wkid=a.wkid;this.wkt=a.wkt}K.prototype.forward=function(a){return a};K.prototype.n=function(a){return a};K.prototype.q=function(){return 360};K.prototype.toJSON=function(){return"{"+(this.wkid?" wkid:"+this.wkid:"wkt: '"+this.wkt+"'")+"}"};
function L(a){a=a||{};K.call(this,a)}L.prototype=new K;function M(a){a=a||{};K.call(this,a);var b=a.J,c=a.N*k,d=a.O*k,e=a.K*k;this.a=a.r/a.unit;this.g=a.p*k;this.i=a.H;this.j=a.I;a=1/b;b=2*a-a*a;this.e=Math.sqrt(b);a=this.k(c,b);b=this.k(d,b);e=N(this,e,this.e);c=N(this,c,this.e);d=N(this,d,this.e);this.b=Math.log(a/b)/Math.log(c/d);this.F=a/(this.b*Math.pow(c,this.b));this.h=this.t(this.a,this.F,e,this.b)}M.prototype=new K;
M.prototype.k=function(a,b){var c=Math.sin(a);return Math.cos(a)/Math.sqrt(1-b*c*c)};function N(a,b,c){a=c*Math.sin(b);return Math.tan(Math.PI/4-b/2)/Math.pow((1-a)/(1+a),c/2)}j=M.prototype;j.t=function(a,b,c,d){return a*b*Math.pow(c,d)};j.s=function(a,b,c){c=b*Math.sin(c);return Math.PI/2-2*Math.atan(a*Math.pow((1-c)/(1+c),b/2))};j.M=function(a,b,c){var d=0;c=c;for(var e=this.s(a,b,c);Math.abs(e-c)>1.0E-9&&d<10;){d++;c=e;e=this.s(a,b,c)}return e};
j.forward=function(a){var b=a[0]*k;a=this.t(this.a,this.F,N(this,a[1]*k,this.e),this.b);b=this.b*(b-this.g);return[this.i+a*Math.sin(b),this.j+this.h-a*Math.cos(b)]};j.n=function(a){var b=a[0]-this.i,c=a[1]-this.j;a=Math.atan(b/(this.h-c));b=Math.pow((this.b>0?1:-1)*Math.sqrt(b*b+(this.h-c)*(this.h-c))/(this.a*this.F),1/this.b);return[(a/this.b+this.g)/k,this.M(b,this.e,Math.PI/2-2*Math.atan(b))/k]};j.q=function(){return Math.PI*2*this.a};
function O(a){a=a||{};K.call(this,a);this.a=a.r/a.unit;var b=a.J;this.A=a.ha;var c=a.K*k;this.g=a.p*k;this.i=a.H;this.j=a.I;a=1/b;this.c=2*a-a*a;this.w=this.c*this.c;this.G=this.w*this.c;this.m=this.c/(1-this.c);this.P=this.k(c,this.a,this.c,this.w,this.G)}O.prototype=new K;O.prototype.k=function(a,b,c,d,e){return b*((1-c/4-3*d/64-5*e/256)*a-(3*c/8+3*d/32+45*e/1024)*Math.sin(2*a)+(15*d/256+45*e/1024)*Math.sin(4*a)-35*e/3072*Math.sin(6*a))};
O.prototype.forward=function(a){var b=a[1]*k,c=a[0]*k;a=this.a/Math.sqrt(1-this.c*Math.pow(Math.sin(b),2));var d=Math.pow(Math.tan(b),2),e=this.m*Math.pow(Math.cos(b),2);c=(c-this.g)*Math.cos(b);var f=this.k(b,this.a,this.c,this.w,this.G);return[this.i+this.A*a*(c+(1-d+e)*Math.pow(c,3)/6+(5-18*d+d*d+72*e-58*this.m)*Math.pow(c,5)/120),this.j+this.A*(f-this.P)+a*Math.tan(b)*(c*c/2+(5-d+9*e+4*e*e)*Math.pow(c,4)/120+(61-58*d+d*d+600*e-330*this.m)*Math.pow(c,6)/720)]};
O.prototype.n=function(a){var b=a[0],c=a[1];a=(1-Math.sqrt(1-this.c))/(1+Math.sqrt(1-this.c));c=(this.P+(c-this.j)/this.A)/(this.a*(1-this.c/4-3*this.w/64-5*this.G/256));a=c+(3*a/2-27*Math.pow(a,3)/32)*Math.sin(2*c)+(21*a*a/16-55*Math.pow(a,4)/32)*Math.sin(4*c)+151*Math.pow(a,3)/6*Math.sin(6*c)+1097*Math.pow(a,4)/512*Math.sin(8*c);c=this.m*Math.pow(Math.cos(a),2);var d=Math.pow(Math.tan(a),2),e=this.a/Math.sqrt(1-this.c*Math.pow(Math.sin(a),2)),f=this.a*(1-this.c)/Math.pow(1-this.c*Math.pow(Math.sin(a),
2),1.5);b=(b-this.i)/(e*this.A);e=a-e*Math.tan(a)/f*(b*b/2-(5+3*d+10*c-4*c*c-9*this.m)*Math.pow(b,4)/24+(61+90*d+28*c+45*d*d-252*this.m-3*c*c)*Math.pow(b,6)/720);return[(this.g+(b-(1+2*d+c)*Math.pow(b,3)/6+(5-2*c+28*d-3*c*c+8*this.m+24*d*d)*Math.pow(b,5)/120)/Math.cos(a))/k,e/k]};O.prototype.q=function(){return Math.PI*2*this.a};function P(a){a=a||{};K.call(this,a);this.a=(a.r||6378137)/(a.unit||1);this.g=(a.p||0)*k}P.prototype=new K;
P.prototype.forward=function(a){var b=a[1]*k;return[this.a*(a[0]*k-this.g),this.a/2*Math.log((1+Math.sin(b))/(1-Math.sin(b)))]};P.prototype.n=function(a){return[(a[0]/this.a+this.g)/k,(Math.PI/2-2*Math.atan(Math.exp(-a[1]/this.a)))/k]};P.prototype.q=function(){return Math.PI*2*this.a};
function Q(a){a=a||{};K.call(this,a);var b=a.J,c=a.N*k,d=a.O*k,e=a.K*k;this.a=a.r/a.unit;this.g=a.p*k;this.i=a.H;this.j=a.I;a=1/b;b=2*a-a*a;this.e=Math.sqrt(b);a=this.k(c,b);b=this.k(d,b);c=R(this,c,this.e);d=R(this,d,this.e);e=R(this,e,this.e);this.b=(a*a-b*b)/(d-c);this.D=a*a+this.b*c;this.h=this.t(this.a,this.D,this.b,e)}Q.prototype=new K;Q.prototype.k=function(a,b){var c=Math.sin(a);return Math.cos(a)/Math.sqrt(1-b*c*c)};
function R(a,b,c){a=c*Math.sin(b);return(1-c*c)*(Math.sin(b)/(1-a*a)-1/(2*c)*Math.log((1-a)/(1+a)))}j=Q.prototype;j.t=function(a,b,c,d){return a*Math.sqrt(b-c*d)/c};j.s=function(a,b,c){var d=b*Math.sin(c);return c+(1-d*d)*(1-d*d)/(2*Math.cos(c))*(a/(1-b*b)-Math.sin(c)/(1-d*d)+Math.log((1-d)/(1+d))/(2*b))};j.M=function(a,b,c){var d=0;c=c;for(var e=this.s(a,b,c);Math.abs(e-c)>1.0E-8&&d<10;){d++;c=e;e=this.s(a,b,c)}return e};
j.forward=function(a){var b=a[0]*k;a=this.t(this.a,this.D,this.b,R(this,a[1]*k,this.e));b=this.b*(b-this.g);return[this.i+a*Math.sin(b),this.j+this.h-a*Math.cos(b)]};j.n=function(a){var b=a[0]-this.i;a=a[1]-this.j;var c=Math.sqrt(b*b+(this.h-a)*(this.h-a)),d=this.b>0?1:-1;c=(this.D-c*c*this.b*this.b/(this.a*this.a))/this.b;return[(Math.atan(d*b/(d*this.h-d*a))/this.b+this.g)/k,this.M(c,this.e,Math.asin(c/2))/k]};j.q=function(){return Math.PI*2*this.a};j.q=function(){return Math.PI*2*this.a};m=new L({wkid:4326});
n=new L({wkid:4269});o=new P({wkid:102113,r:6378137,p:0,unit:1});q={"4326":m,"4269":n,"102113":o,"102100":new P({wkid:102100,r:6378137,p:0,unit:1})};
r.aa=function(a,b){var c=q[""+a];if(c)return c;if(b instanceof K)c=q[""+a]=b;else{c=b||a;var d={wkt:a};if(a===parseInt(a,10))d={wkid:a};var e=s(c,'PROJECTION["','"]'),f=s(c,"SPHEROID[","]").split(",");if(e!==""){d.unit=parseFloat(s(s(c,"PROJECTION",""),"UNIT[","]").split(",")[1]);d.r=parseFloat(f[1]);d.J=parseFloat(f[2]);d.K=parseFloat(s(c,'"Latitude_Of_Origin",',"]"));d.p=parseFloat(s(c,'"Central_Meridian",',"]"));d.H=parseFloat(s(c,'"False_Easting",',"]"));d.I=parseFloat(s(c,'"False_Northing",',
"]"))}switch(e){case "":c=new K(d);break;case "Lambert_Conformal_Conic":d.N=parseFloat(s(c,'"Standard_Parallel_1",',"]"));d.O=parseFloat(s(c,'"Standard_Parallel_2",',"]"));c=new M(d);break;case "Transverse_Mercator":d.ha=parseFloat(s(c,'"Scale_Factor",',"]"));c=new O(d);break;case "Albers":d.N=parseFloat(s(c,'"Standard_Parallel_1",',"]"));d.O=parseFloat(s(c,'"Standard_Parallel_2",',"]"));c=new Q(d);break;default:throw new Error(e+"  not supported");}if(c)q[""+a]=c}return c};
function S(a){this.url=a;this.definition=null}function T(a,b){this.url=a;this.L=false;var c=a.split("/");this.name=c[c.length-2].replace(/_/g," ");b=b||{};if(b.ea){var d=this;window.setTimeout(function(){U(d)},b.ea*1E3)}else U(this)}function U(a){J(a.url,{},"",function(b){a.z(b)})}
T.prototype.z=function(a){var b=this;if(a.error)throw new Error(a.error.message);u(a,this);this.spatialReference=a.spatialReference.wkt?r.aa(a.spatialReference.wkt):q[a.spatialReference.wkid];if(a.tables!==undefined)J(this.url+"/layers",{},"",function(c){V(b,c);J(b.url+"/legend",{},"",function(d){var e=b.layers;if(d.layers){var f,g,i,h;g=0;for(i=d.layers.length;g<i;g++){h=d.layers[g];f=e[h.layerId];u(h,f)}}W(b)})});else{V(b,a);W(b)}};function W(a){a.L=true;v(a,"load")}
function V(a,b){var c=[],d=[];a.layers=c;if(b.tables)a.tables=d;var e,f,g,i;f=0;for(g=b.layers.length;f<g;f++){i=b.layers[f];e=new S(a.url+"/"+i.id);u(i,e);e.visible=e.defaultVisibility;c.push(e)}if(b.tables){f=0;for(g=b.tables.length;f<g;f++){i=b.tables[f];e=new S(a.url+"/"+i.id);u(i,e);d.push(e)}}f=0;for(g=c.length;f<g;f++){e=c[f];if(e.subLayerIds){e.subLayers=[];d=0;for(i=e.subLayerIds.length;d<i;d++){var h;a:{h=e.subLayerIds[d];var w=a.layers;if(w)for(var x=0,fa=w.length;x<fa;x++){if(h===w[x].id){h=
w[x];break a}if(t(h)&&w[x].name.toLowerCase()===h.toLowerCase()){h=w[x];break a}}h=null}e.subLayers.push(h);h.ka=e}}}}function ga(a){var b={};if(a.layers)for(var c=0,d=a.layers.length;c<d;c++){var e=a.layers[c];if(e.definition)b[String(e.id)]=e.definition}return b}
function ha(a){var b=[];if(a.layers){var c,d,e;d=0;for(e=a.layers.length;d<e;d++){c=a.layers[d];if(c.subLayers)for(var f=0,g=c.subLayers.length;f<g;f++)if(c.subLayers[f].visible===false){c.visible=false;break}}d=0;for(e=a.layers.length;d<e;d++){c=a.layers[d];c.subLayers&&c.subLayers.length>0||c.visible===true&&b.push(c.id)}}return b}function ia(a){if(a.initialExtent){a.V=a.V||G(a.initialExtent);return a.V}return null}
function ja(a,b,c,d){if(b&&b.bounds){var e={};e.f=b.f;var f=b.bounds;e.bbox=""+f.getSouthWest().lng()+","+f.getSouthWest().lat()+","+f.getNorthEast().lng()+","+f.getNorthEast().lat();e.size=""+b.width+","+b.height;e.dpi=b.dpi;if(b.imageSR)e.imageSR=b.imageSR.wkid?b.imageSR.wkid:"{wkt:"+b.imageSR.wkt+"}";e.bboxSR="4326";e.format=b.format;f=b.layerDefinitions;if(f===undefined)f=ga(a);e.layerDefs=ca(f);f=b.layerIds;var g=b.layerOption||"show";if(f===undefined)f=ha(a);if(f.length>0)e.layers=g+":"+f.join(",");
else if(a.L&&c){c({href:null});return}e.transparent=b.transparent===false?false:true;if(b.time)e.time=ba(b.time,b.ia);e.fa=b.fa;if(e.f==="image")return a.url+"/export?"+I(e);else J(a.url+"/export",e,"",function(i){if(i.extent){i.bounds=G(i.extent);delete i.extent;c(i)}else{i=i.error;d&&i&&i.error&&d(i.error)}})}}
function X(a){this.ga=a?a.lods:null;this.v=a?q[a.spatialReference.wkid||a.spatialReference.wkt]:o;if(!this.v)throw new Error("unsupported Spatial Reference");this.ba=a?a.lods[0].resolution:156543.033928;this.minZoom=Math.floor(Math.log(this.v.q()/this.ba/256)/Math.LN2+0.5);this.maxZoom=a?this.minZoom+this.ga.length-1:20;if(l.Size)this.ca=a?new l.Size(a.cols,a.rows):new l.Size(256,256);this.B=Math.pow(2,this.minZoom)*this.ba;this.Y=a?a.origin.x:-2.0037508342787E7;this.Z=a?a.origin.y:2.0037508342787E7;
if(a)for(var b,c=0;c<a.lods.length-1;c++){b=a.lods[c].resolution/a.lods[c+1].resolution;if(b>2.001||b<1.999)throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");}}X.prototype.fromLatLngToPoint=function(a,b){if(!a||isNaN(a.lat())||isNaN(a.lng()))return null;var c=this.v.forward([a.lng(),a.lat()]),d=b||new l.Point(0,0);d.x=(c[0]-this.Y)/this.B;d.y=(this.Z-c[1])/this.B;return d};X.prototype.fromLatLngToPoint=X.prototype.fromLatLngToPoint;
X.prototype.fromPointToLatLng=function(a){if(a===null)return null;a=this.v.n([a.x*this.B+this.Y,this.Z-a.y*this.B]);return new l.LatLng(a[1],a[0])};var Y=new X;
function Z(a,b){b=b||{};if(b.opacity){this.u=b.opacity;delete b.opacity}u(b,this);this.d=a instanceof T?a:new T(a);if(b.U){var c=s(this.d.url,"","://");this.da=c+"://"+b.U+s(this.d.url,c+"://"+s(this.d.url,"://","/"),"");this.X=parseInt(s(b.U,"[","]"),10)}this.name=b.name||this.d.name;this.maxZoom=b.maxZoom||19;this.minZoom=b.minZoom||0;this.S=b.S||this.maxZoom;if(this.d.L)this.z(b);else{var d=this;l.event.addListenerOnce(this.d,"load",function(){d.z(b)})}this.o={};this.W=b.map}
Z.prototype.z=function(a){if(this.d.tileInfo){this.l=new X(this.d.tileInfo);this.minZoom=a.minZoom||this.l.minZoom;this.maxZoom=a.maxZoom||this.l.maxZoom}};
Z.prototype.getTileUrl=function(a,b){var c=b-(this.l?this.l.minZoom:this.minZoom),d="";if(!isNaN(a.x)&&!isNaN(a.y)&&c>=0&&a.x>=0&&a.y>=0){var e=this.d.url;if(this.da)e=this.da.replace("["+this.X+"]",""+(a.y+a.x)%this.X);d=this.l||(this.W?this.W.getProjection():Y);if(!d instanceof X)d=Y;var f=d.ca,g=1<<b,i=new l.Point(a.x*f.width/g,(a.y+1)*f.height/g);g=new l.Point((a.x+1)*f.width/g,a.y*f.height/g);i=new l.LatLngBounds(d.fromPointToLatLng(i),d.fromPointToLatLng(g));g=this.d;if(g.fullExtent){g.T=g.T||
G(g.fullExtent);g=g.T}else g=null;if(this.d.singleFusedMapCache===false||b>this.S){c={f:"image"};c.bounds=i;c.format="png32";c.width=f.width;c.height=f.height;c.imageSR=d.v;d=ja(this.d,c)}else d=g&&!g.intersects(i)?"":e+"/tile/"+c+"/"+a.y+"/"+a.x}return d};
function $(a,b){b=b||{};var c;if(b.opacity){this.u=b.opacity;delete b.opacity}u(b,this);var d=a;if(t(a))d=[new Z(a,b)];else if(a instanceof T)d=[new Z(a,b)];else if(a instanceof Z)d=[a];else if(a.length>0&&t(a[0])){d=[];for(c=0;c<a.length;c++)d[c]=new Z(a[c],b)}this.C=d;this.o={};if(b.maxZoom!==undefined)this.maxZoom=b.maxZoom;else{var e=0;for(c=0;c<d.length;c++)e=Math.max(e,d[c].maxZoom);this.maxZoom=e}if(d[0].l){this.tileSize=d[0].l.ca;this.projection=d[0].l}else this.tileSize=new l.Size(256,256);
if(!this.name)this.name=d[0].name}
$.prototype.getTile=function(a,b,c){for(var d=c.createElement("div"),e="_"+a.x+"_"+a.y+"_"+b,f=0;f<this.C.length;f++){var g=this.C[f];if(b<=g.maxZoom&&b>=g.minZoom){var i=g.getTileUrl(a,b);if(i){var h=c.createElement(document.all?"img":"div");h.style.border="0px none";h.style.margin="0px";h.style.padding="0px";h.style.overflow="hidden";h.style.position="absolute";h.style.top="0px";h.style.left="0px";h.style.width=""+this.tileSize.width+"px";h.style.height=""+this.tileSize.height+"px";if(document.all)h.src=
i;else h.style.backgroundImage="url("+i+")";d.appendChild(h);g.o[e]=h;if(g.u!==undefined)y(h,g.u);else this.u!==undefined&&y(h,this.u)}}}this.o[e]=d;d.setAttribute("tid",e);return d};$.prototype.getTile=$.prototype.getTile;$.prototype.releaseTile=function(a){if(a.getAttribute("tid")){a=a.getAttribute("tid");this.o[a]&&delete this.o[a];for(var b=0;b<this.C.length;b++){var c=this.C[b];c.o[a]&&delete c.o[a]}}};$.prototype.releaseTile=$.prototype.releaseTile;new l.OverlayView;var ka=T,la=Z;var ma=r.aa(2264,'PROJCS["NAD_1983_StatePlane_North_Carolina_FIPS_3200_Feet",GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Conformal_Conic"],PARAMETER["False_Easting",2000000.002616666],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-79.0],PARAMETER["Standard_Parallel_1",34.33333333333334],PARAMETER["Standard_Parallel_2",36.16666666666666],PARAMETER["Latitude_Of_Origin",33.75],UNIT["Foot_US",0.3048006096012192]]');
window.onload=function(){var a=new ka("http://maps.ci.charlotte.nc.us/ArcGIS/rest/services/GET/BaseMap/MapServer");google.maps.event.addListenerOnce(a,"load",function(){try{var b=new la(a),c=new $([b],{name:"StatePlane"}),d={zoom:12,center:ia(a).getCenter(),mapTypeId:"stateplane",mapTypeControlOptions:{mapTypeIds:["stateplane",google.maps.MapTypeId.ROADMAP]}},e=new google.maps.Map(document.getElementById("map_canvas"),d);e.mapTypes.set("stateplane",c);google.maps.event.addListener(e,"mousemove",function(g){window.status=
ma.forward([g.latLng.lng(),g.latLng.lat()]).join(",")})}catch(f){alert(f)}})};})()
