import { Component, OnInit } from '@angular/core';
import {
  IReview,
  IReviewResponse,
} from 'src/app/shared/interfaces/reviews.interface';
import { ReviewService } from '../../shared/services/review/review.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss'],
})
export class AdminReviewsComponent implements OnInit {
  constructor(public reviewService: ReviewService) {}

  public adminRewiewsArray: Array<IReviewResponse> = [];

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getAllFirebase().subscribe((data) => {
      this.adminRewiewsArray = data as IReviewResponse[]; // Додайте нові відгуки на початок масиву
      this.adminRewiewsArray.sort((a, b) => b.count - a.count);
    });
  }
}
