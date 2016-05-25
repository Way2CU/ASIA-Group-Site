$(window).load(function() {
	$('.pictures').jMosaic({
		items_type: "a", // Type of elements in the selector (Default: img);
		min_row_height: 300, // Minimal row height (Default: 150);
		margin: 5, // Space between elements (Default: 0);
		is_first_big: false // First row - largest (Default: false);
	});
});
