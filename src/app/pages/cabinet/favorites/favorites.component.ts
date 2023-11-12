import { Component, OnInit } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { FavoriteService } from '../../../shared/services/favorite/favorite.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent  implements OnInit{

  public favoritesGoods: Array<IGoodsResponse> = [];;



  constructor(
    public FavoriteService: FavoriteService,
    
  ) {}

  


  ngOnInit(): void {
    this.loadFavoriteGoods()
  }

  loadFavoriteGoods(): void {
    this.FavoriteService.getAllFirebase().subscribe((data) => {
      this.favoritesGoods = data as IGoodsResponse[];
      // console.log(data)
    });
  }

 // delete goods
 deleteGoods(product: IGoodsResponse): void {
  this.FavoriteService.deleteFirebase(product.id as string).then(() => {
    this.loadFavoriteGoods();
    // this.toastService.success('Продукт видалений');
  });
}





}
