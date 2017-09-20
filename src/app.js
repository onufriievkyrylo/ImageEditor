let $ = require('jquery'),
   ImageEditor = require('./ImageEditor.js');

let imgEditor = new ImageEditor(document.getElementById('canvas'));

$(e => {
   imgEditor.pencilColor = $('#color').val();
   imgEditor.pencilWidth = $('#width').val();
})

$('#canvas').mousedown(e => {
   if (e.which == 1)
      imgEditor.startDrawing(e.offsetX, e.offsetY)
})

$('#canvas').mouseup(e => {
   imgEditor.endDrawing()
})
$('#canvas').mouseout(e => {
   imgEditor.endDrawing()
})

$('#canvas').mousemove(e => {
   imgEditor.stroke(e.offsetX, e.offsetY);
})

$('#width').change(e => {
   imgEditor.pencilWidth = $('#width').val();
})

$('#color').change(e => {
   imgEditor.pencilColor = $('#color').val();
})

$('#clear').click(e => {
   imgEditor.clear();
})

$(document).keydown(e => {
   if (e.ctrlKey)
      if (e.keyCode == 90)
         imgEditor.undo();
      else if (e.keyCode == 89)
         imgEditor.redo();
   if (e.keyCode == 46)
      imgEditor.clear();
})

$('#undo').click(e => {
   imgEditor.undo();
})

$('#redo').click(e => {
   imgEditor.redo();
})

$('#image').change(e => {
   imgEditor.uploadImage($('#image').prop('files')[0]);
});