import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  constructor() {}

  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {

    const mockArticles: Article[] = [
      {
        title: "Mock Article 1",
        description: "Description for mock article 1",
        body: "Body of mock article 1",
        slug: "mock-article-1",
        tagList: ["mock", "article"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 0,
        author: {
          username: "mockUser",
          bio: "Mock user bio",
          image: "",
          following: false,
        },
      },
      {
        title: "Mock Article 2",
        description: "Description for mock article 2",
        body: "Body of mock article 2",
        slug: "mock-article-2",
        tagList: ["mock", "test"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 0,
        author: {
          username: "mockUser2",
          bio: "Another mock user bio",
          image: "",
          following: false,
        },
      },
    ];

  
    return of({ articles: mockArticles, articlesCount: mockArticles.length });
  }

  get(slug: string): Observable<Article> {
  
    const mockArticle: Article = {
      title: "Single Mock Article",
      description: "A mock article for testing",
      body: "Content of single mock article",
      slug: slug,
      tagList: ["mock"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "mockAuthor",
        bio: "Mock Author Bio",
        image: "",
        following: false,
      },
    };
    return of(mockArticle);
  }

  delete(slug: string): Observable<void> {
   
    return of(void 0);
  }

  create(article: Partial<Article>): Observable<Article> {
  
    const createdArticle: Article = {
      ...article,
      title: article.title ?? "New Mock Article",
      description: article.description ?? "New mock description",
      body: article.body ?? "New mock body",
      slug: "new-mock-article",
      tagList: article.tagList ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "mockAuthor",
        bio: "Mock Bio",
        image: "",
        following: false,
      },
    } as Article;
    return of(createdArticle);
  }

  update(article: Partial<Article>): Observable<Article> {

    const updatedArticle: Article = {
      ...article,
      updatedAt: new Date().toISOString(),
      favorited: article.favorited ?? false,
      favoritesCount: article.favoritesCount ?? 0,
      tagList: article.tagList ?? [],
      author: {
        username: "updatedMockAuthor",
        bio: "Updated Mock Bio",
        image: "",
        following: false,
      },
    } as Article;
    return of(updatedArticle);
  }

  favorite(slug: string): Observable<Article> {
    const favoritedArticle: Article = {
      title: "Favorited Mock Article",
      description: "A mock article now favorited",
      body: "Body of a now favorited mock article",
      slug: slug,
      tagList: ["mock"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: true,
      favoritesCount: 1,
      author: {
        username: "mockAuthor",
        bio: "Mock Bio",
        image: "",
        following: false,
      },
    };
    return of(favoritedArticle);
  }

  unfavorite(slug: string): Observable<void> {
    
    return of(void 0);
  }
}
