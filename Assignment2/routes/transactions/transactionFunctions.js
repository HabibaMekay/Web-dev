const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksbd', {
  serverSelectionTimeoutMS: 30000,
});

const transactionSchema = new mongoose.Schema({
  id: Number, 
  bookId: Number, 
  userId: Number, 
  isReturned: { type: Boolean, default: false },
  borrowDate: { type: Date, default: Date.now }, 
  returnDate: { type: Date, default: null }, 
});

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = {
    getAllTransactions : async () => await Transaction.find(),
    getTransactionById : async (id) => await Transaction.findOne({ id }),

    borrowTransaction : async (bookId, userId) => {

        const existingTransaction = await Transaction.findOne({ bookId, isReturned: false });
        if (existingTransaction) {
            throw new Error('Book is already checked out');
        }

        const lastTransaction = await Transaction.findOne().sort({ id: -1 });
        const newID = lastTransaction.id + 1;
        const newTransaction = new Transaction({
            id: newID,
            bookId,
            userId,
            isReturned: false, 
            borrowDate: new Date(), 
        });
        await newTransaction.save();
        return newTransaction;
    },

    returnTransaction : async (id) => {
        const transaction = await Transaction.findOne({ id , isReturned: false});
        if (!transaction) throw new Error('That book not checked out');; 
        transaction.isReturned = true;
        transaction.returnDate = new Date();;
        await transaction.save();
        return transaction;
    },

    deleteTransaction : async (id) => {
        const result = await Transaction.deleteOne({ id });
        return result.deletedCount > 0; 
    },


};