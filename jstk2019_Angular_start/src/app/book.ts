import { Category } from './category.enum';

export class Book {
    id: number;
    title: string;
    author: string;
    description: string;
    isbn: string;
    category: Category;
    releaseDate: Date;
    borrowDate: Date;
    returnDate: string;
    addDate: Date;
    cover: string;
    publishingHouse: string;
    availability: boolean;
    email: string;
}
