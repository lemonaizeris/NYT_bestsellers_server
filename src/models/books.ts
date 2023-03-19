export interface BestsellerList {
    listName: string;
    displayName: string;
    listNameEncoded: string;
}

interface BestsellerListResult {
    list_name: string,
    display_name: string,
    list_name_encoded: string
}

export interface BestsellerListResponse {
    num_results: number,
    results: BestsellerListResult[]
}

export interface BookReview {
    url: string,
    summary: string
}

export interface BookReviewsResponse {
    num_results: number,
    results: BookReview[]
}

export interface SpecificBestsellerTop {
    title: string,
    author: string,
    isbn: string,
    rank: number
}

interface SpecificBestsellerTopResult {
    rank: number,
    book_details:
        {
            title: string,
            author: string,
            primary_isbn13: string,
            primary_isbn10: string
        }[]
}

export interface SpecificBestsellerTopResponse {
    num_results: number,
    results: SpecificBestsellerTopResult[]
}