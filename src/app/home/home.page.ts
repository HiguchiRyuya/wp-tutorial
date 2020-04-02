import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WordpressService } from '../wordpress.service';

import { IPost } from '../interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts: IPost[] = [];

  constructor(
    public loadingController: LoadingController,
    public woedpress: WordpressService
  ) { }

  async ionViewDidEnter() {

    const loading = await this.loadingController.create({
      message: 'now Loading...',
    });

    if (!this.posts.length) {
      await loading.present();
    }

    this.woedpress.getPosts()
      .subscribe(data => {
        this.posts = data['posts'];
        loading.dismiss();
      });
  }

  trackByFn(index, item): number {
    return item.ID;
  }
}
