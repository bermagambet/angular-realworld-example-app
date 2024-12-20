import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  constructor(private readonly http: HttpClient) {}
  private mockArticles: Article[] = [
    {
      slug: "article-1",
      title: "Article 1",
      description: "1",
      body: "1",
      tagList: ["mock", "article"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: true,
      favoritesCount: 10,
      author: {
        username: "mockuser",
        bio: "Mock bio",
        image: "mock-url",
        following: true,
      },
    },
    {
      slug: "article-1",
      title: "article-2",
      description: "2",
      body: "2",
      tagList: ["mock", "data"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: true,
      favoritesCount: 55,
      author: {
        username: "mockuser2",
        bio: "bio2",
        image: "url-2",
        following: true,
      },
    },
  ];
  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    let params = new HttpParams();
    
    return of({
      articles: this.mockArticles,
      articlesCount: this.mockArticles.length,
    });

    Object.keys(config.filters).forEach((key) => {
      // @ts-ignore
      params = params.set(key, config.filters[key]);
    });

    return this.http.get<{ articles: Article[]; articlesCount: number }>(
      "/articles" + (config.type === "feed" ? "/feed" : ""),
      { params },
    );
  }

  get(slug: string): Observable<Article> {
    const article = this.mockArticles.find((article) => article.slug === slug);
    return of(article!);   
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>("/articles/", { article: article })
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.slug}`, {
        article: article,
      })
      .pipe(map((data) => data.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`/articles/${slug}/favorite`, {})
      .pipe(map((data) => data.article));
  }

  unfavorite(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}