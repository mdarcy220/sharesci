import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ArticleService } from '../../services/article.service'
import { IArticle } from '../../models/datacontracts/article.interface'
import { Article } from '../../models/entities/article.entity'
import { saveAs } from 'file-saver'

@Component({
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
    constructor(private _sharedService: SharedService, private _route: ActivatedRoute,
        private _articleService: ArticleService) { }

    article: Article = null

    ngOnInit() {
        this._articleService.getArticle(this._route.snapshot.params['id'], false)
            .map(response => <IArticle>response)
            .subscribe(
                results => this.showArticleData(results),
                error => console.log(error)
            )
    }

    showArticleData(articleWrapper: IArticle) {
        if (articleWrapper.errno == 0) {
            this.article = articleWrapper.articleJson;
        }
    }

    viewPdf(download: boolean) {
        this._articleService.getArticle(this.article._id, true)
            .subscribe(
            results => {
                if (download) {
                    saveAs(results, this.article.title + ".pdf");
                    return;
                }
                var fileURL = URL.createObjectURL(results);
                window.open(fileURL);
            },
            error => console.log(error)
            );
    }

}
