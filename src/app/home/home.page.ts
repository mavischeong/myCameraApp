import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

image 

  constructor(public camera:Camera,
  			public photoLibrary:PhotoLibrary,
  			public socialSharing:SocialSharing,
  			public iab:InAppBrowser) {}

  cameraPressed(){

  	//get from Ionic Documantation:Camera
  	const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL, //FILE_URI will show in the file. DATA-URL is to show the data
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
  //if the photo orientation is not right, can use below code:
  //correctionOrientation:true
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 //changed let base64Image from documentation to this.image in order to bring the image on html. otherwise the taken image will only floating somewhere.
 this.image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});

  }

  libraryPressed(){
this.photoLibrary.requestAuthorization().then(() => {
  this.photoLibrary.getLibrary().subscribe({
    next: library => {
      library.forEach(function(libraryItem) {
        console.log(libraryItem.id);          // ID of the photo
        console.log(libraryItem.photoURL);    // Cross-platform access to photo
        console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
        console.log(libraryItem.fileName);
        console.log(libraryItem.width);
        console.log(libraryItem.height);
        console.log(libraryItem.creationDate);
        console.log(libraryItem.latitude);
        console.log(libraryItem.longitude);
        console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
      });
    },
    error: err => { console.log('could not get photos'); },
    complete: () => { console.log('done getting photos'); }
  });
})
.catch(err => console.log('permissions weren\'t granted'));
  }

  shareFacebookPressed(){

//'com.facebook.katana' for android device

this.socialSharing.shareVia('com.apple.social.facebook', //share to facebook from apple device
	'Sent from Ionic Class',
	null,
	this.image,
	null).then(() => {
  console.log('successfully shared on FB')
}).catch(() => {
  console.log('something is wrong')
});
}

shareEmailPressed(){
// Share via email
this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});

  }

  openIAB(){
  	const browser = this.iab.create('https://ionicframework.com/');
  	const iosoption: InAppBrowserOptions = {
  		zoom:'no',
  		location:'yes',
  		toolbar:'yes',
  		clearcache:'yes',
  		clearsessioncache:'yes',
  		disallowoverscroll:'yes',
  		enableViewportScale:'yes'
  	}

  }

}
