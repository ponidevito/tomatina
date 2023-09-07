import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public progress$ = new Subject<number>();

  // percent for progress bar
  public uploadPercent: number = 0;

  constructor(private storage: Storage) {}

  // This method is designed for uploading files to a Firebase Storage account. It takes three parameters:
  async uploadFile(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const path = `${folder}/${name}`;
    console.log(path);
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        task.on(
          'state_changed',
          (snapshot) => {
            this.progress$.next(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.progress$.subscribe((progress) => {
              console.log('Upload is ' + Math.round(progress) + '% done');
              this.uploadPercent = Math.round(progress);
            });
          },
          (error) => {
            console.error(error);
          },
          () => {
            console.log('Upload is complete');
          }
        );
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  // delete upload file
  deleteUploadFile(image: string): Promise<void> {
    const task = ref(this.storage, image);
    return deleteObject(task);
  }
}
