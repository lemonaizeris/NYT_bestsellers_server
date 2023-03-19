import { Application } from 'express';
import supertest from 'supertest';
import createServer from '../utils/server';

const app: Application = createServer();

describe('books', () => {
    describe('get bestsellers lists route', () => {
        describe('given NYT bestsellers API is working', () => {
            it('should return 200', async () => {
                await supertest(app).get(`/books/`).expect(200);
            });
        });
    });

    describe('get bestsellers top 10 route', () => {
        describe('given a correct list code is provided', () => {
            it('should return 200 and not empty array', async () => {
                const listCode: string = 'hardcover-fiction';

                const { body, statusCode } = await supertest(app).get(`/books/${listCode}`);
                expect(statusCode).toBe(200);
                expect(body).not.toHaveLength(0);
            });
        });

        describe('given an incorrect list code is provided', () => {
            it('should return 200 and an empty array', async () => {
                const listCode: string = 'hard-fiction';

                const { body, statusCode } = await supertest(app).get(`/books/${listCode}`);
                expect(statusCode).toBe(200);
                expect(body).toHaveLength(0);
            });
        });
    });

    describe('get book review route', () => {
        describe('given a correct ISBN is provided for a book with a review', () => {
            it('should return 200 and not empty array', async () => {
                const isbn: number = 9780063276000;

                const { body, statusCode } = await supertest(app).get(`/books/reviews/${isbn}`);
                expect(statusCode).toBe(200);
                expect(body).not.toHaveLength(0);
            });
        });

        describe('given a correct ISBN is provided for a book without a review', () => {
            it('should return 200 and not empty array', async () => {
                const isbn: number = 9780593238714;

                const { body, statusCode } = await supertest(app).get(`/books/reviews/${isbn}`);
                expect(statusCode).toBe(200);
                expect(body).toHaveLength(0);
            });
        });

        describe('given an incorrect ISBN is provided', () => {
            it('should return 200', async () => {
                const isbn: number = 0;

                const { statusCode } = await supertest(app).get(`/books/reviews/${isbn}`);
                expect(statusCode).toBe(500);
            });
        });
    });
})