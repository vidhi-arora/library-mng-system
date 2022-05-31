const mongoose = require('mongoose');
const express = require('express');
const Fine = mongoose.model('Fine');
const Books = mongoose.model('Books');
const IssuedBooks = mongoose.model('IssuedBooks');
const ReturnedBooks = mongoose.model('ReturnedBooks');
const RequestedBooks = mongoose.model('RequestedBooks');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middleware/requireAuth');

//returns the current date
const getDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}-${month}-${year}`;
    return date;
}

//function to check fine on each returned book
const checkFine = (book) => {
    let fine = 0;
    const rn_arr = book.returnedOn.split('-');
    const due_arr = book.dueDate.split('-');

    const rnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]);   //Date(yyyy,mm,dd), months start from 0 in JS so subtract 1
    const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

    if (rnDate > dueDate) {
        const Difference_In_Time = rnDate.getTime() - dueDate.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        fine = (Difference_In_Days * 5);
    }
    return fine;

}

const route = express.Router();
route.use('/api/', requireAuth);

//test route
route.get('/test', async (req, res) => {
    res.send("test successful");
})

route.get('/getuserfine', async (req, res) => {

    const data = await Fine.find({ userId: req.user._id });

    res.send(data);
})

// route.get('/getbookfine/:key', async (req, res) => {

//     const data = await ReturnedBooks.find({ userId: req.user._id, isbn: req.params.key });

//     res.send(data);
// })

// route.post('/updateUserFine', async (req, res) => {
//     const { updatefine } = req.body;
//     if (!updatefine) return res.send("something went wrong");

//     try {
//         const datas = await Fine.find({ userId: req.user._id });
//         let new_fine = parseInt(datas[0].fine) + updatefine;
//         console.log("updated fine =" + new_fine);

//         const data = await Fine.updateOne(
//             { userId: req.user._id },
//             {
//                 $set: { fine: new_fine }
//             }
//         )
//         res.send(data);
//         console.log("user fine updated");
//     }
//     catch (e) {
//         console.log(e);
//     }
// })

// route.post('/updatebookfine', async (req, res) => {
//     const { isbn, updatedFine } = req.body;

//     if (!isbn)
//         return res.send('bad request');

//     try {
//         const data = await ReturnedBooks.updateOne(
//             { isbn: isbn },
//             { $set: { fine: updatedFine } }
//         )
//         console.log("book fine updated");
//         res.send(data);
//     }
//     catch (e) {
//         console.log(e);
//     }
// })

route.get('/getissuebooks', async (req, res) => {
    try {
        const data = await IssuedBooks.find({ userId: req.user._id })
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/issued-books', async (req, res) => {
    const { Name, author, isbn, issuedOn, dueDate, image } = req.body;

    if (!Name || !author || !isbn || !issuedOn || !dueDate || !image)
        return res.send("something went wrong");

    try {
        const issued_books = await IssuedBooks.find({ isbn, userId: req.user._id });
        if (issued_books.length !== 0) {
            return res.send("Book already issued.");
        }

        const book = new IssuedBooks({ Name, author, isbn, issuedOn, dueDate, userId: req.user._id, image });
        console.log("issued book - " + book);

        await book.save();
        console.log('book saved');

        const books = await Books.find({ isbn: isbn });
        const copy = parseInt(books[0].copies) - 1;
        await Books.updateOne(
            { isbn: isbn },
            { $set: { copies: copy } }
        )
        console.log("Book issued");
        res.send(book);

    }
    catch (e) {
        console.log(e);
    }
})

route.get('/getreturnbooks', async (req, res) => {
    try {
        const data = await ReturnedBooks.find({ userId: req.user._id })
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
})

// route.post('/returned-books', async (req, res) => {
//     const { Name, author, isbn, issuedOn, returnedOn } = req.body;
//     console.log(req.body);
//     if (!Name || !author || !isbn || !issuedOn || !returnedOn) return res.send("something went wrong");

//     try {
//         const book = new ReturnedBooks({ Name, author, isbn, issuedOn, returnedOn, userId: req.user._id });
//         await book.save();
//         const books = await Books.find({ isbn: isbn });
//         const copy = parseInt(books[0].copies) + 1;
//         await Books.updateOne(
//             { isbn: isbn },
//             { $set: { copies: copy } }
//         )

//     }
//     catch (e) {
//         console.log(e);
//     }
// })

route.get('/search/:key', async (req, res) => {
    // const query = req.params.field;
    // console.log(req.params.key);
    // console.log(query);

    let data = await Books.find({
        "$or": [
            { category: { $regex: req.params.key, $options: "i" } }
        ]
        // , $expr: { $lt: [0.7, { $rand: {} }] }
    }).limit(15);

    console.log("Books fetched");

    res.send(data);
})

route.get('/searchs/:key/:value', async (req, res) => {
    // const query = req.params.field;
    console.log(req.params.key + " = " + req.params.value);
    const key = req.params.key;

    // console.log(query);
    let data = await Books.find({
        "$or": [
            { [key]: { $regex: req.params.value, $options: "i" } }
        ]
    })
    console.log(data.length);
    res.send(data);
})

//To find requested book in the db
// route.get('/search/:bookname/:author', async (req, res) => {
//     console.log(req.params.bookname + " - " + req.params.author);

//     let data = await Books.find({ name: { $regex: req.params.bookname, $options: "i" }, author: { $regex: req.params.author, $options: "i" } })
//     console.log(data.length);
//     res.send(data);
// })

route.get('/searchby/isbn/:key', async (req, res) => {
    // const query = req.params.field;
    console.log(req.params.key);
    // console.log(query);
    let data = await Books.find({ isbn: req.params.key })
    const copy = data[0].copies;
    console.log(copy);
    // console.log(data);
    res.send(data);
})

route.post('/delete-issue', async (req, res) => {
    const { isbn } = req.body;
    if (!isbn)
        return res.send("invalid book");

    console.log(isbn);
    try {
        console.log("searching..");
        const book = await IssuedBooks.findOneAndDelete({ isbn: isbn, userId: req.user._id });
        console.log("deleted book -" + book);

        const newbook = new ReturnedBooks({ name: book.Name, author: book.author, isbn: book.isbn, issuedOn: book.issuedOn, dueDate: book.dueDate, returnedOn: getDate(), image: book.image, userId: req.user._id });
        await newbook.save();

        try {
            //update the copies of returned book
            const books = await Books.find({ isbn: isbn });
            const copy = parseInt(books[0].copies) + 1;
            await Books.updateOne(
                { isbn: isbn },
                { $set: { copies: copy } }
            )

            //update returned book fine
            const BookFine = checkFine(newbook);
            await ReturnedBooks.updateOne(
                { isbn: newbook.isbn, userId: req.user._id },
                { $set: { fine: BookFine } }
            )
            const returnedBooks = await ReturnedBooks.find({ isbn: book.isbn, userId: req.user._id });

            //updating user fine
            const userData = await Fine.find({ userId: req.user._id });
            let new_fine = parseInt(userData[0].fine) + returnedBooks[0].fine;
            console.log("updated user fine =" + new_fine);

            const data = await Fine.updateOne(
                { userId: req.user._id },
                {
                    $set: { fine: new_fine }
                }
            )
        }
        catch (e) {
            console.log(e);
        }

        res.send("Book Returned succesfully");
    }
    catch (e) {
        console.log(e);
    }

})

// route.post('/deletebook', async (req, res) => {
//     const { isbn } = req.body;
//     if (!isbn) res.send('invalid book');
//     try {
//         await Books.findOneAndDelete({ isbn: isbn });
//         res.send("done");
//     }
//     catch (e) {
//         console.log(e);
//     }
// })


route.post('/request', async (req, res) => {
    const { bookName, author } = req.body;
    if (!bookName || !author)
        return res.send("wrong info");
    // console.log(req.user.name);
    try {
        const request = new RequestedBooks({ name: bookName, author, requestedOn: getDate(), userId: req.user._id })
        console.log(request);
        await request.save();
        res.send("book request added");
    }
    catch (e) {
        console.log(e);
    }
})

route.get('/getrequest', async (req, res) => {
    try {
        const response = await RequestedBooks.find({});
        res.send(response);
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/updaterequeststatus', async (req, res) => {
    const { id, status } = req.body;

    try {
        const new_request = await RequestedBooks.findOneAndUpdate({ _id: id }, { status }, { new: true });
        res.send(new_request);

    }
    catch (e) {
        console.log(e);
    }
})

//get user specific requests
route.get('/getuserrequests', async (req, res) => {
    try {
        const data = await RequestedBooks.find({ userId: req.user._id });
        res.send(data);
        // console.log(data);
    }
    catch (e) {
        console.log(e.response.data);
    }
})

// route.post('/deletereq', async (req, res) => {
//     const { name } = req.body;
//     //book name
//     console.log(name);
//     if (!name)
//         return res.send("invalid book");
//     try {
//         await RequestedBooks.findOneAndDelete({ name: name });
//         res.send("done");
//     }
//     catch (e) {
//         console.log(e);
//     }
// })

route.post('/addbook', async (req, res) => {
    const { image, name, author, book_depository_stars, isbn, category, pages, publisher } = req.body;
    if (!image || !name || !author || !book_depository_stars || !isbn || !category || !pages || !publisher)
        return res.send("invalid request");

    try {
        const new_book = await new Books({ image, name, author, book_depository_stars, isbn, category, pages, publisher });
        await new_book.save();
        res.send("Book added in database");
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/deletebook', async (req, res) => {
    const { isbn } = req.body;
    if (!isbn)
        return res.send("invalid isbn");

    try {
        const isIssued = await IssuedBooks.findOne({ isbn });
        if (isIssued === null) {
            const book = await Books.findOneAndDelete({ isbn });
            res.send("Book deleted successfully");
        }
        else
            res.send("Book is currently issued.");
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/updatebook', async (req, res) => {
    // const { name } = req.body;
    console.log(req.body);
    // const { image, name, book_depository_stars, isbn, category, copies, pages, publisher } = req.body;
    // if (!image || !name || !book_depository_stars || !isbn || !category || !copies || !pages || !publisher) 
    // if (!name)
    //     return res.send("invalid request");
    try {

        //only the fields changed will be updated
        for (let key in req.body) {
            const response = await Books.findOneAndUpdate({ _id: req.body._id }, { [key]: req.body[key] }, { new: true });
            console.log(response);
        }

        // const updated_book = await Books.findOneAndUpdate({ name }, { copies, image, book_depository_stars, isbn, category, pages, publisher }, { new: true });
        // console.log("updated_book = " + updated_book);
        res.send("Book details updated");
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = route;