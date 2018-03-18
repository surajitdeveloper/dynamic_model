document.addEventListener("online", onOnline, false); 
function onOnline() { 
	$('.network-offline').hide();  
} 
document.addEventListener("offline", onOffline, false); 
function onOffline() { 
	$('.network-offline').show(); 
}

