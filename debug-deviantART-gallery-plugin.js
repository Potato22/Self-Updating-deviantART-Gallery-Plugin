/*
modified by Potto/Potato2292
merge of:
https://github.com/jamesl1001/deviantART-Gallery-Plugin
https://github.com/jamesl1001/deviantART-API

http://goessner.net/
*/

const USERNAME = "fu51on"
const GalleryId = "27123391"

function getDeviations(url, limit, start) {
    var deviations = [],
        limit = limit || null,
        start = start || 0;
    let xhr = new XMLHttpRequest;
    xhr.open("GET", "https://backend.deviantart.com/rss.xml?q=gallery:"+USERNAME+"/"+GalleryId), xhr.send(), console.log("[DAGP] request sent"), xhr.onload = function () {
        let json1 = xml2json((new DOMParser).parseFromString(xhr.response, "text/xml")),
            json2, items = JSON.parse("{" + json1.slice(11)).rss.channel.item;
        for (var i = 0, l = items.length; i < l; i++)
            if (!(i < start)) {
                if (limit && i == start + limit) break;
                var object = {};
                object.title = items[i].title, object.link = items[i].link, object.image = items[i]["media:content"]["@url"], deviations.push(object), console.log("[DAGP] feed received")
            } console.log("[DAGP] DATA:"), processDeviations(deviations), deviantARTGalleryPlugin(USERNAME, GalleryId, "16:9")
    }
}

/*
This work is licensed under Creative Commons GNU LGPL License.
License: http://creativecommons.org/licenses/LGPL/2.1/
Version: 0.9
Author:  Stefan Goessner/2006
Web:     http://goessner.net/
*/
function xml2json(e,n){var t={toObj:function(e){var n={};if(1==e.nodeType){if(e.attributes.length)for(var i=0;i<e.attributes.length;i++)n["@"+e.attributes[i].nodeName]=(e.attributes[i].nodeValue||"").toString();if(e.firstChild){for(var r=0,o=0,l=!1,a=e.firstChild;a;a=a.nextSibling)1==a.nodeType?l=!0:3==a.nodeType&&a.nodeValue.match(/[^ \f\n\r\t\v]/)?r++:4==a.nodeType&&o++;if(l)if(r<2&&o<2)for(t.removeWhite(e),a=e.firstChild;a;a=a.nextSibling)3==a.nodeType?n["#text"]=t.escape(a.nodeValue):4==a.nodeType?n["#cdata"]=t.escape(a.nodeValue):n[a.nodeName]?n[a.nodeName]instanceof Array?n[a.nodeName][n[a.nodeName].length]=t.toObj(a):n[a.nodeName]=[n[a.nodeName],t.toObj(a)]:n[a.nodeName]=t.toObj(a);else e.attributes.length?n["#text"]=t.escape(t.innerXml(e)):n=t.escape(t.innerXml(e));else if(r)e.attributes.length?n["#text"]=t.escape(t.innerXml(e)):n=t.escape(t.innerXml(e));else if(o)if(o>1)n=t.escape(t.innerXml(e));else for(a=e.firstChild;a;a=a.nextSibling)n["#cdata"]=t.escape(a.nodeValue)}e.attributes.length||e.firstChild||(n=null)}else 9==e.nodeType?n=t.toObj(e.documentElement):alert("unhandled node type: "+e.nodeType);return n},toJson:function(e,n,i){var r=n?'"'+n+'"':"";if(e instanceof Array){for(var o=0,l=e.length;o<l;o++)e[o]=t.toJson(e[o],"",i+"\t");r+=(n?":[":"[")+(e.length>1?"\n"+i+"\t"+e.join(",\n"+i+"\t")+"\n"+i:e.join(""))+"]"}else if(null==e)r+=(n&&":")+"null";else if("object"==typeof e){var a=[];for(var d in e)a[a.length]=t.toJson(e[d],d,i+"\t");r+=(n?":{":"{")+(a.length>1?"\n"+i+"\t"+a.join(",\n"+i+"\t")+"\n"+i:a.join(""))+"}"}else r+="string"==typeof e?(n&&":")+'"'+e.toString()+'"':(n&&":")+e.toString();return r},innerXml:function(e){var n="";if("innerHTML"in e)n=e.innerHTML;else for(var t=function(e){var n="";if(1==e.nodeType){n+="<"+e.nodeName;for(var i=0;i<e.attributes.length;i++)n+=" "+e.attributes[i].nodeName+'="'+(e.attributes[i].nodeValue||"").toString()+'"';if(e.firstChild){n+=">";for(var r=e.firstChild;r;r=r.nextSibling)n+=t(r);n+="</"+e.nodeName+">"}else n+="/>"}else 3==e.nodeType?n+=e.nodeValue:4==e.nodeType&&(n+="<![CDATA["+e.nodeValue+"]]>");return n},i=e.firstChild;i;i=i.nextSibling)n+=t(i);return n},escape:function(e){return e.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")},removeWhite:function(e){e.normalize();for(var n=e.firstChild;n;)if(3==n.nodeType)if(n.nodeValue.match(/[^ \f\n\r\t\v]/))n=n.nextSibling;else{var i=n.nextSibling;e.removeChild(n),n=i}else 1==n.nodeType?(t.removeWhite(n),n=n.nextSibling):n=n.nextSibling;return e}};9==e.nodeType&&(e=e.documentElement);var i=t.toJson(t.toObj(t.removeWhite(e)),e.nodeName,"\t");return"{\n"+n+(n?i.replace(/\t/g,n):i.replace(/\t|\n/g,""))+"\n}"}

const TARGET = "daImg";
//define the element class name that the script will find and inject.


function deviantARTGalleryPlugin(e, t, n) {
    var s = [];
    ! function () {
        console.log("[DAGP] fetching user:", e, "folder:", t, "");
        var a = "https://backend.deviantart.com/rss.xml?q=gallery:"+USERNAME+"/"+GalleryId+":" + e + "/" + t;
        window.callback = function (e) {
            for (var t = e.items, a = 0, i = t.length; a < i; a++) {
                var l = {};
                l.title = t[a].title, l.image = t[a].enclosure.link, s.push(l)
            }
            for (var d = "", a = 0, i = s.length; a < i; a++) d += 
            //Below is the element that the script will inject into DOM.
            //Element will repeat with the amount of images requested/limited to.
            // ### Feel free to customize it. ###
            '<img style="position: relative; max-width:100%; overflow: hidden;" src="' + s[a].image + '"/>';

            document.getElementById(TARGET).innerHTML = d, console.log("[DAGP] images fetched.\n", e.feed.title, "\n", e.status, "\n\n Plugins by jamesl1001\nhttps://github.com/jamesl1001/deviantART-Gallery-Plugin\nhttps://github.com/jamesl1001/deviantART-API\n\nThis version was heavily modified by Potto.");
            const event = new Event("finish");
            document.getElementById(TARGET).dispatchEvent(event)
        };
        var i = document.createElement("script");
        i.src = "https://api.rss2json.com/v1/api.json?callback=callback&rss_url=" + escape(a), document.body.appendChild(i)
    }()
}