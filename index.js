/*!
* express-of-age
* MIT Licensed
*/

/**
* Module dependencies.
*/
var moment = require('moment');

var uas = ["google","googlebot","msnbot","yahoo","facebook", "abcdatos","acme-spider","ahoythehomepagefinder","Alkaline","anthill","appie","arachnophilia","arale","araneo","araybot","architext","aretha","ariadne","arks","aspider","atn","atomz","auresys","backrub","bayspider","bbot","bigbrother","bjaaland","blackwidow","blindekuh","Bloodhound","borg-bot","boxseabot","brightnet","bspider","cactvschemistryspider","calif","cassandra","cgireader","checkbot","christcrawler","churl","cienciaficcion","cmc","Collective","combine","confuzzledbot","coolbot","cosmos","cruiser","cusco","cyberspyder","cydralspider","desertrealm","deweb","dienstspider","digger","diibot","directhit","dnabot","download_express","dragonbot","dwcp","e-collector","ebiness","eit","elfinbot","emacs","emcspider","esculapio","esther","evliyacelebi","nzexplorer","fastcrawler","fdse","felix","ferret","fetchrover","fido","finnish","fireball","fish","fouineur","francoroute","freecrawl","funnelweb","gama","gazz","gcreep","getbot","geturl","golem","grapnel","griffon","gromit","gulliver","gulperbot","hambot","harvest","havindex","hometown","wired-digital","htdig","htmlgobble","hyperdecontextualizer","iajabot","iconoclast","Ilse","imagelock","incywincy","informant","infoseek","infoseeksidewinder","infospider","inspectorwww","intelliagent","irobot","iron33","israelisearch","javabee","JBot","jcrawler","askjeeves","jobo","jobot","joebot","jubii","jumpstation","kapsi","katipo","kdd","kilroy","ko_yappo_robot","labelgrabber.txt","larbin","legs","linkidator","linkscan","linkwalker","lockon","logo_gif","lycos","macworm","magpie","marvin","mattie","mediafox","merzscope","meshexplorer","MindCrawler","mnogosearch","moget","momspider","monster","motor","muncher","muninn","muscatferret","mwdsearch","myweb","NDSpider","netcarta","netmechanic","netscoop","newscan-online","nhse","nomad","northstar","objectssearch","occam","octopus","OntoSpider","openfind","orb_search","packrat","pageboy","parasite","patric","pegasus","perignator","perlcrawler","phantom","phpdig","piltdownman","pimptrain","pioneer","pitkow","pjspider","pka","plumtreewebaccessor","poppi","portalb","psbot","Puu","python","raven","rbse","resumerobot","rhcs","rixbot","roadrunner","robbie","robi","robocrawl","robofox","robozilla","roverbot","rules","safetynetrobot","scooter","search_au","search-info","searchprocess","senrigan","sgscout","shaggy","shaihulud","sift","simbot","site-valet","sitetech","skymob","slcrawler","slurp","smartspider","snooper","solbot","speedy","spider_monkey","spiderbot","spiderline","spiderman","spiderview","spry","ssearcher","suke","suntek","sven","sygol","tach_bw","tarantula","tarspider","tcl","techbot","templeton","titin","titan","tkwww","tlspider","ucsd","udmsearch","uptimebot","urlck","valkyrie","verticrawl","victoria","visionsearch","voidbot","voyager","vwbot","w3index","w3m2","wallpaper","wanderer","wapspider","webbandit","webcatcher","webcopy","webfetcher","webfoot","webinator","weblayers","weblinker","webmirror","webmoose","webquest","webreader","webreaper","webs","websnarf","webspider","webvac","webwalk","webwalker","webwatch","wget","whatuseek","whowhere","wlm","wmir","wolp","wombat","worm","wwwc","wz101","xget","Nederland.zoek", "integrity"];
var uaRegex = new RegExp(uas.join('|'), 'gi');

/**
* Express Of Age Module - provides functionality to ensure that users are of age visiting the site.
*/

exports = module.exports = function ofAge(options){
    return function ofAge(req, res, next){
        var url = (options.url ? options.url : '/agegate');
        var age = (options.age ? options.age : 21);

        if(req.method == "POST" && req.path == url){
            if(req.body.birthdate){
                var years = moment().diff(new Date(req.body.birthdate), 'years');
                if(years >= age){
                    req.cookies.ofage = true;
                    res.cookie('ofage', true, { maxAge: 900000, path:'/' });
                    return res.redirect('/');
                } else {
                    return res.redirect(url+"?notofage=1");
                }
            } else {
                return res.redirect(url+"?notofage=1");
            }
        }
        if(typeof(req.cookies) === "undefined" && req.path != url){
            if(typeof(req.headers['user-agent']) !== "undefined") {
                if(uaRegex.test(req.headers['user-agent'])){
                    req.cookies.ofage = true;
                    res.cookie('ofage', true, { maxAge: 900000, path:'/' });
                    return next();
                }
            }
            return res.redirect(url);
        } else {
            if(req.cookies.ofage && req.path != url){
                return next();
            } else if (req.cookies.ofage && req.path == url) {
                return res.redirect('/');
            } else if( req.path != url ){
                if(typeof(req.headers['user-agent']) !== "undefined") {
                    if(uaRegex.test(req.headers['user-agent'])){
                        req.cookies.ofage = true;
                        res.cookie('ofage', true, { maxAge: 900000, path:'/' });
                        return next();
                    }
                }

                return res.redirect(url)
            } else {
                return next();
            }
        }
    };
};
