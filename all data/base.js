$(document).ready(function(){prettyPrint()});var navHeight=$(".navbar").outerHeight(true)+10;$("body").scrollspy({target:".bs-sidebar",offset:navHeight});$("li.disabled a").click(function(){event.preventDefault()});window.disableShift=false;var shiftWindow=function(){if(window.disableShift){window.disableShift=false}else{var scrolledToBottomOfPage=window.innerHeight+window.scrollY>=document.body.offsetHeight;if(!scrolledToBottomOfPage){scrollBy(0,-60)}}};if(location.hash){shiftWindow()}window.addEventListener("hashchange",shiftWindow);$("ul.nav a").click(function(){var href=this.href;var suffix=location.hash;var matchesCurrentHash=href.indexOf(suffix,href.length-suffix.length)!==-1;if(location.hash&&matchesCurrentHash){window.disableShift=true;location.hash=""}});