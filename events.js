$(function() {
	$('#controls').accordion();
	$('#container').on('mouseenter', '.gridSpace', function() {
			classes[deps.hoverClass]($(this), true);
	});
	$('#container').on('mouseleave', '.gridSpace', function() {
			classes[deps.hoverClass]($(this), false);
	});
	$('#reactionType').on('change', 'input', function() {
		if ($(this)[0].type == 'checkbox')
		{
			deps.random = $(this)[0].checked;
			grid.reset(deps);
		}
		else
		{
			deps.hoverClass = $(this).val();
			grid.reset(deps);
		}
	});
	$('#border').on('change', '#borderToggle', function() {
		deps.border = $(this)[0].checked;
		grid.reset(deps);
	});
	$('#border').on('click', '#updateBorder', function() {
		newWidth = Number($('#borderWidth').val());
		deps.borderColor = $('#borderColor').val();
		if (!isNaN(newWidth) && newWidth <= 15)
		{
			deps.borderSize = newWidth;
		}
		grid.reset(deps);
	});
	$('#size').on('click', '#updateSize', function() {
		newRows = Number($('#gridHeight').val());
		newCols = Number($('#gridWidth').val());
		if (!isNaN(newRows))
		{
			deps.rows = newRows;
		}
		if (!isNaN(newCols))
		{
			deps.cols = newCols;
		}
		grid.reset(deps);
	});
	$('#etc').on('click', '#updateEtc', function() {
		deps.bgColor = $('#gridColor').val();
		deps.flashColor = $('#hoverColor').val();
		fadeRate = Number($('#fadeOut').val());
		if (!isNaN(fadeRate))
		{
			deps.colorFadeRate = fadeRate;
		}
		grid.reset(deps);
		console.log(deps);
	});
});