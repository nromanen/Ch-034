 function testName(testName) {
	var regexp = /^[А-ЯЄІЇ]'?[а-яєії']*[а-яєії]*\-[А-ЯЄІЇ][а-яєії']+$|^[А-ЯЄІЇ][а-яєії']+$/;
	return regexp.test(testName);
};