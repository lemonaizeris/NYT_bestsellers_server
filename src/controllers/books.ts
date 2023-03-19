import { Response, Request, NextFunction, RequestHandler } from "express";
import axios from "axios";
import { 
    BestsellerList, 
    BestsellerListResponse,
    SpecificBestsellerTop,
    SpecificBestsellerTopResponse,
    BookReview,
    BookReviewsResponse
} from "../models/books";

export const GetBestsellersLists: RequestHandler = ( req: Request, res: Response, next: NextFunction ) => {
    const bestsellerListNames: BestsellerList[] = [];
    let newBestsellerListName: BestsellerList;

    const params: string = `api-key=${process.env.NYT_BOOKS_API_KEY}`;

    axios({
        "method": 'GET',
        "url": `https://api.nytimes.com/svc/books/v3/lists/names.json?${params}`,
        "headers": {
            "Accept": "application/json"
        }
    }).then(response => {
        if (!response) {
            return res.status(404).json([]);
        }
        if (response.data.num_results <= 0) {
            return res.status(200).json([]);
        }

        let listsNamesResponse = <BestsellerListResponse>response.data;

        listsNamesResponse.results.forEach(element => {
            
            newBestsellerListName = {
                listName: element.list_name,
                displayName: element.display_name,
                listNameEncoded: element.list_name_encoded
            }
            bestsellerListNames.push(newBestsellerListName);
        });
        
        return res.status(200).json(bestsellerListNames);
    }).catch (error=>{
        console.log(error);
        if(error.response.status == 429) {
            return res.status(429).json([]);
        }
        return res.status(500).json([]);
    })
}

export const GetBestsellersTop10: RequestHandler = ( req: Request, res: Response, next: NextFunction ) => {
    if (!req.params || !req.params.listCode) {
        return res.status(400).json([]);
    }

    const specificBestsellersTop: SpecificBestsellerTop[] = [];
    let specificBestsellerTopEntry: SpecificBestsellerTop;
    let listCode: string = req.params.listCode;

    const params: string = `api-key=${process.env.NYT_BOOKS_API_KEY}&list=${listCode}`;
    
    axios({
        "method": 'GET',
        "url": `https://api.nytimes.com/svc/books/v3/lists.json?${params}`,
        "headers": {
            "Accept": "application/json"
        }
    }).then(response => {
        if (!response) {
            return res.status(404).json([]);
        }
        if (response.data.num_results <= 0) {
            return res.status(200).json([]);
        }

        let specificBestsellersTopResponse = <SpecificBestsellerTopResponse>response.data;


        specificBestsellersTopResponse.results.sort((a,b)=> a.rank - b.rank);

        const entriesCount: number = specificBestsellersTopResponse.num_results < 10 ? specificBestsellersTopResponse.num_results : 10;

        for (let i = 0; i < entriesCount; i++){
            specificBestsellerTopEntry = {
                title: specificBestsellersTopResponse.results[i].book_details[0].title,
                author: specificBestsellersTopResponse.results[i].book_details[0].author,
                isbn: specificBestsellersTopResponse.results[i].book_details[0].primary_isbn13,
                rank: specificBestsellersTopResponse.results[i].rank
            }
            specificBestsellersTop.push(specificBestsellerTopEntry);
        }

        return res.status(200).json(specificBestsellersTop);
    }).catch (error=> {
        console.log(error);
        if(error.response.status == 429) {
            return res.status(429).json([]);
        }
        return res.status(500).json([]);
    })
}

export const GetReviewsByISBN: RequestHandler = ( req: Request, res: Response, next: NextFunction ) => {
    if (!req.params || !req.params.isbn) {
        return res.status(400).json([]);
    }

    const bookReviews: BookReview[] = [];
    let newReview: BookReview;
    const isbn = Number(req.params.isbn);

    const params: string = `api-key=${process.env.NYT_BOOKS_API_KEY}&isbn=${isbn}`;

    axios({
        "method": 'GET',
        "url": `https://api.nytimes.com/svc/books/v3/reviews.json?${params}`,
        "headers": {
            "Accept": "application/json"
        }
    }).then(response => {
        if (!response) {
            return res.status(404).json([]);
        }
        if (response.data.num_results <= 0) {
            return res.status(200).json([]);
        }

        let bookReviewsResponse = <BookReviewsResponse>response.data;

        bookReviewsResponse.results.forEach(element => {
            newReview = {
                url: element.url,
                summary: element.summary
            }
            bookReviews.push(newReview);
        });

        return res.status(200).json(bookReviews);
    }).catch (error => {
        console.log(error);
        if(error.response.status == 429) {
            return res.status(429).json([]);
        }
        return res.status(500).json([]);
    })
}