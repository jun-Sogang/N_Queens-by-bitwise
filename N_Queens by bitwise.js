var check_col = 0;
var check_major_diag = 0;
var check_minor_diag = 0;

var check = function(row, col, NbyN) {
	if ((check_col & 1 << col) || (check_minor_diag & 1 << (col + row)) || (check_major_diag & 1 << (row - col + NbyN - 1))) return false;
	return true;
};

var rec = function(row, NbyN) {
	var ans = 0;
	if (row === NbyN) return 1;
	for (var col = 0; col < NbyN; col++) {
		if (check(row, col, NbyN)) {
			check_col = check_col ^ (1 << col);
			check_minor_diag = check_minor_diag ^ (1 << col + row);
			check_major_diag = check_major_diag ^ (1 << row - col + NbyN - 1);
			ans += rec(row + 1, NbyN);
			check_col = check_col ^ (1 << col);
			check_minor_diag = check_minor_diag ^ (1 << col + row);
			check_major_diag = check_major_diag ^ (1 << row - col + NbyN - 1);
		}
	}
	return ans;
};


for (var i = 1; i <= 8; i++) {
	var ans = 0;
	console.log(i, ': ', rec(0, i, 0));
}
