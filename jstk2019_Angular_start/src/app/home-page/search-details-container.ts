import { Category } from '../category.enum';

export class SearchDetailsContainer {

    title: string;
    author: string;
    category: Category;
    dateFrom: Date;
    dateTo: Date;
    publishingHouse: string;
    availability: boolean;

    // tslint:disable-next-line:max-line-length
    constructor(title: string, author: string, category: Category, dateFrom: Date, dateTo: Date, publishingHouse: string, availability: boolean) {
        this.title = title;
        this.author = author;
        this.category = Category[category];
        this.dateFrom = dateFrom ? new Date(dateFrom) : undefined;
        this.dateTo = dateTo ? new Date(dateTo) : undefined;
        this.publishingHouse = publishingHouse;
        this.availability = availability === null ? undefined : availability;
    }
}
