import { Routes } from '@angular/router';

import {
  articleResolver,
  articlesResolver,
} from '@core/resolvers/article.resolver';
import { authorResolver } from '@core/resolvers/author.resolver';
import { bookResolver, booksResolver } from '@core/resolvers/book.resolver';
import { authResolver, userResolver } from '@core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: ``,
    loadComponent: () =>
      import(`@shared/components/layout/layout.component`).then(
        ({ LayoutComponent }) => LayoutComponent
      ),
    children: [
      {
        path: `set-author-details`,
        loadComponent: () =>
          import(`@pages/author-details/author-details.component`).then(
            ({ AuthorDetailsComponent }) => AuthorDetailsComponent
          ),
        title: `Set Author Details`,
        resolve: { author: authorResolver },
        data: {
          action: {
            label: `Back`,
            path: `..`,
            icon: `back`,
            requiresAuth: false,
          },
        },
      },
      {
        path: `articles`,
        children: [
          {
            path: `create`,
            loadComponent: () =>
              import(`@pages/article/article.component`).then(
                ({ ArticleComponent }) => ArticleComponent
              ),
            title: `Create Blog Article`,
            data: {
              action: {
                label: `Back`,
                path: `..`,
                icon: `back`,
                requiresAuth: false,
              },
            },
          },
          {
            path: `:id`,
            loadComponent: () =>
              import(`@pages/article/article.component`).then(
                ({ ArticleComponent }) => ArticleComponent
              ),
            title: `Update Blog Article`,
            resolve: { article: articleResolver },
            data: {
              action: {
                label: `Back`,
                path: `..`,
                icon: `back`,
                requiresAuth: false,
              },
            },
          },
          {
            path: ``,
            loadComponent: () =>
              import(`@pages/articles/articles.component`).then(
                ({ ArticlesComponent }) => ArticlesComponent
              ),
            title: `Atika's Blog Articles`,
            resolve: { articles: articlesResolver },
            data: {
              action: {
                label: `Create Article`,
                path: `/articles/create`,
                icon: `add`,
                requiresAuth: true,
              },
            },
          },
        ],
      },
      {
        path: `:id`,
        loadComponent: () =>
          import(`@pages/view-article/view-article.component`).then(
            ({ ViewArticleComponent }) => ViewArticleComponent
          ),
        title: `View Blog Article`,
        resolve: { article: articleResolver },
        data: {
          action: {
            label: `Back`,
            path: `..`,
            icon: `back`,
            requiresAuth: false,
          },
        },
      },
      {
        path: `books`,
        children: [
          {
            path: `create`,
            loadComponent: () =>
              import(`@pages/book/book.component`).then(
                ({ BookComponent }) => BookComponent
              ),
            title: `Create Book`,
            resolve: { article: bookResolver },
            data: {
              action: {
                label: `Back`,
                path: `..`,
                icon: `back`,
                requiresAuth: false,
              },
            },
          },
          {
            path: `edit/:id`,
            loadComponent: () =>
              import(`@pages/book/book.component`).then(
                ({ BookComponent }) => BookComponent
              ),
            title: `Update Book`,
            resolve: { article: bookResolver },
            data: {
              action: {
                label: `Back`,
                path: `..`,
                icon: `back`,
                requiresAuth: false,
              },
            },
          },
          {
            path: `:id`,
            loadComponent: () =>
              import(`@pages/view-book/view-book.component`).then(
                ({ ViewBookComponent }) => ViewBookComponent
              ),
            title: `View Book`,
            resolve: { article: bookResolver },
            data: {
              action: {
                label: `Back`,
                path: `..`,
                icon: `back`,
                requiresAuth: false,
              },
            },
          },
          {
            path: ``,
            loadComponent: () =>
              import(`@pages/books/books.component`).then(
                ({ BooksComponent }) => BooksComponent
              ),
            title: `View Books`,
            resolve: { articles: booksResolver },
            data: {
              action: {
                label: `Create Book`,
                path: `/books/create`,
                icon: `add`,
                requiresAuth: true,
              },
            },
          },
        ],
      },
      {
        path: ``,
        loadComponent: () =>
          import(`@pages/home/home.component`).then(
            ({ HomeComponent }) => HomeComponent
          ),
        title: `About Atika Dominic`,
        resolve: { articles: authorResolver },
      },
    ],
    resolve: { user: userResolver, isAuthenticated: authResolver },
  },
  {
    path: `**`,
    loadComponent: () =>
      import(`@shared/components/not-found/not-found.component`).then(
        ({ NotFoundComponent }) => NotFoundComponent
      ),
  },
];
