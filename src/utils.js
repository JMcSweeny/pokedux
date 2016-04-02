export default {
	getIdFromUrl: getIdFromUrl,
    padNumber: padNumber
};

function getIdFromUrl(url) {
	return parseInt(url.split('/')[6]);
}

function padNumber(number, length) {
    let num = number.toString();
    
    if(num.length >= length) {
        return num;
    }
    
    return padNumber(`0${num}`, length);
}