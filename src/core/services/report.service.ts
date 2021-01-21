import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }
  public imgToBase64(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
  
    // I think this won't work inside the function from the console
    img.crossOrigin = 'anonymous';
  
    ctx.drawImage(img, 0, 0);
  
    return canvas.toDataURL();
  }

   getBase64FromImageUrl(url) {
    var img = new Image();
 
    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =img.width;
        canvas.height =img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;
}
}
