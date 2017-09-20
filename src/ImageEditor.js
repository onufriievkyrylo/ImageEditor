class ImageEditor {
   constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.drawing = false;
      this.history = {
         undoList: [],
         redoList: []
      };
      this.pencil = {
         color: "#000000",
         width: 1
      };
   }

   set pencilColor(color) {
      this.pencil.color = color;
   }

   set pencilWidth(width) {
      this.pencil.width = width;
   }

   startDrawing(x, y) {
      this.drawing = true;
      this.saveState();
      this.context.beginPath();
      this.context.lineWidth = this.pencil.width;
      this.context.strokeStyle = this.pencil.color;
      this.context.moveTo(x, y);
   }

   stroke(x, y) {
      if (this.drawing) {
         this.context.lineTo(x, y);
         this.context.stroke();
      }
   }

   endDrawing() {
      this.context.closePath();
      this.drawing = false;
   }

   uploadImage(file) {
      let image = new Image(),
         url = window.URL || window.webkitURL,
         src = url.createObjectURL(file);
      image.src = src;
      image.onload = (function() {
         let correlation = image.width / image.height;
         let {width, height} = image;
         if (image.width > this.canvas.width || image.height > this.canvas.height) {
            if (correlation == 1) {
               width = Math.min(this.canvas.width, this.canvas.height);
               height = width;
            } else if (correlation > 1) {
               width = this.canvas.width;
               height = width / correlation;
            } else {
               height = this.canvas.height;
               width = height * correlation;
            }
         }
         this.saveState();
         this.context.drawImage(image, 0, 0, width, height);
         url.revokeObjectURL(src);
      }).bind(this)
   }

   clear() {
      this.saveState();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   saveState() {
      this.history.undoList.push(this.canvas.toDataURL());
      this.history.redoList = [];
   }

   undo() {
      let src = this.history.undoList.pop();
      if (src) {
         this.history.redoList.push(this.canvas.toDataURL());
         this.restoreState(src);
      }
   }

   redo() {
      let src = this.history.redoList.pop();
      if (src) {
         this.history.undoList.push(this.canvas.toDataURL());
         this.restoreState(src);
      }
   }

   restoreState(src) {
      if (src) {
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
         let state = new Image();
         state.src = src;
         state.onload = (() => this.context.drawImage(state, 0, 0)).bind(this);
      }
   }
}

module.exports = ImageEditor;