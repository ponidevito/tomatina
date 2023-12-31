import { Component, OnInit } from '@angular/core';
import { IReviewResponse } from 'src/app/shared/interfaces/reviews.interface';
import { ReviewService } from '../../shared/services/review/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss'],
})
export class AdminReviewsComponent implements OnInit {
  constructor(
    public reviewService: ReviewService,
    private toastService: ToastrService
  ) {}

  public adminRewiewsArray: Array<IReviewResponse> = [];

  ngOnInit(): void {
    this.loadReviews();
  }

 // This method loads all orders from Firebase using the getAllFirebase() method from the reviewService.
  loadReviews(): void {
    this.reviewService.getAllFirebase().subscribe((data) => {
      this.adminRewiewsArray = data as IReviewResponse[]; 
      this.adminRewiewsArray.sort((a, b) => b.count - a.count);
    });
  }

  // delete Reviews
  deleteReviews(review: IReviewResponse): void {
    this.reviewService.deleteFirebase(review.id as string).then(() => {
      this.loadReviews();
      console.log('ffff');
      this.toastService.success('Продукт видалений');
    });
  }

}
