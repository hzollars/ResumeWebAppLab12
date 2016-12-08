/**
 * Created by student on 12/5/16.
 */
var express = require('express');
var router = express.Router();
var account_dal  = require('../model/account_dal');

// View All Accounts
router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.getById(req.query.account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('account/accountAdd', {'account': result});
        }
    });
});

// View the school for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.first_name == null) {
        res.send('Account First Name must be provided.');
    }
    if(req.query.last_name == null) {
        res.send('Account Last Name must be provided.');
    }
    else if(req.query.email == null) {
        res.send('An email must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});


router.get('/edit2', function(req, res){
    if(req.query.account_id == null) {
        res.send('A account id is required');
    }
    else {
        account_dal.getById(req.query.account_id, function(err, result){
            res.render('account/accountUpdate', {'result': result});
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    // console.log("DELETING " + req.query.account_id);
    console.log("dfdsfdshfk " + req.query.email);
    account_dal.update(req.query, function (err, result) {
        res.redirect(302, '/account/all');
    });
    // account_dal.delete(req.query.account_id, function(err, result){
    //
    //     account_dal.insert(req.query.first_name, req.query.last_name, req.query.email, function (err, result) {
    //         console.log("INSERTING");
    //         res.redirect(302, '/account/all');
    //     });
    // });
});

module.exports = router;
