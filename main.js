/* Global variables */

var deps = null;
var grid = null;
var classes = {
	'highlight': highlight,
	'holdColor': holdColor,
	'trail': trail
}		

function start() { //Do this when the page loads
	grid = new Grid($('#container'));
	grid.generate(deps);
}

/******************* Hover Functions *******************/

function highlight($this, enter) {
	enter ? $this.css({'background-color': getColor(enter)}) : $this.css({'background-color': deps.bgColor});
}

function holdColor($this, enter) {
	if (!deps.random)
	{
		$this.css({'background-color': deps.flashColor});
	}
	else
	{
		$this.css({'background-color': getColor(enter)});
	}
}

function trail($this, enter) {
	enter ? $this.css({backgroundColor: getColor(enter)}) :
		    $this.animate({backgroundColor: deps.bgColor}, deps.colorFadeRate)
}

function getColor(enter) {
	if (deps.random)
	{
		return '#' + Math.floor(Math.random()*16777215).toString(16);
	}
	else
	{
		return enter ? deps.flashColor : deps.bgColor;
	}
}

/********************** Grid Object **********************/

var Grid = function Grid(container) {
	this.container = container
	this.containerHeight = this.container.height();
	this.containerWidth = this.container.width();
}

Grid.prototype.defaultDeps = { //Edit all the grid parameters
	border: true,
	borderSize: 1,
	borderStyle: 'solid',
	borderColor: 'black',
	bgColor: 'blue',
	flashColor: 'white',
	colorFadeRate: 1000,
	random: false,
	hoverClass: 'highlight',
	rows: 16,
	cols: 16
}

Grid.prototype.sizeGrid = function(gridStyle) {
	newDeps = this.defaultDeps;
	for (i in newDeps)
	{
		if (newDeps[i] == gridStyle[i])
		{
			newDeps[i] = gridStyle[i];
		}
	}
	newDeps['spaceHeight'] = this.containerHeight / newDeps.rows;
	newDeps['spaceWidth'] = this.containerWidth / newDeps.cols;
	if (newDeps.border)
	{
		newDeps['spaceHeight'] -= newDeps.borderSize * 2;
		newDeps['spaceWidth'] -= newDeps.borderSize * 2;
	}
	return newDeps
}

Grid.prototype.applyCSS = function(deps) {
	gridSpaces = this.container[0].children;
	for (i in gridSpaces)
	{
		if (typeof(gridSpaces[i].id) == 'string')
		{
			if (deps.border)
			{
				$('#' + gridSpaces[i].id).css({'border':deps.borderSize + 'px ' + deps.borderStyle + ' ' + deps.borderColor})
			}
			$('#' + gridSpaces[i].id).css({'height': deps.spaceHeight, 'width': deps.spaceWidth, 'background-color': deps.bgColor});
		}
	}
}

Grid.prototype.generate = function(gridStyle) {
	deps = gridStyle ? this.sizeGrid(gridStyle) : this.sizeGrid(this.defaultDeps);
	this.container.empty();
	for (i=0; i<deps.rows; i++)
	{
		for (j=0; j<deps.cols; j++)
		{
			spaceDiv = '<div class="gridSpace" ';
			spaceDiv += 'id="' + i + '_' + j + '"></div>';
			this.container.append(spaceDiv);
		}
	}
	this.applyCSS(deps);
}

Grid.prototype.reset = function(deps) {
	this.container.empty()
	this.generate(deps);
}