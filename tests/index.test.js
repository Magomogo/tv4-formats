describe('tv4-formats', function () {
    'use strict';

    var assert = require('assert'),
        formats = require('../index.js');

    describe('date', function () {
        it('is defined', function () {
            assert.strictEqual(typeof formats.date, 'function');
        });

        it('returns no error for a valid ISO 8601 date', function () {
            assert.strictEqual(formats.date('2014-02-11'), null);
        });

        it('complains about 30th of February, mentioning the expected format', function () {
            assert(/YYYY-MM-DD/.test(formats.date('2014-02-30')));
        });

        it('complains when the date format is wrong', function () {
            assert(formats.date('11.02.2014').length > 0);
        });

        it('complains when it\'s not a date at all', function () {
            assert(formats.date('BOO!').length > 0);
        });
    });

    describe('date-time', function () {
        it('is defined', function () {
            assert.strictEqual(typeof formats['date-time'], 'function');
        });

        it('returns no error for a valid ISO 8601 UTC date and time with a TZ offset', function () {
            assert.strictEqual(formats['date-time']('2014-02-11T15:19:59+00:00'), null);
        });

        it('returns no error for a valid ISO 8601 UTC date and time with no TZ offset', function () {
            assert.strictEqual(formats['date-time']('2014-02-11T15:19:59Z'), null);
        });

        it('returns no error for a valid ISO 8601 UTC date-time with a TZ offset and fractional seconds', function () {
            assert.strictEqual(formats['date-time']('2014-02-11T15:19:59.000+00:00'), null);
        });

        it('it complains on garbage', function () {
            assert(formats['date-time']('jsdfhdfsb hjsbdfhbdhbbfd hjsdb').length > 0);
        });

        it('complains on a date-time in a wrong format 1', function () {
            assert(formats['date-time']('2014-02-11 16:31:14').length > 0);
        });

        it('complains on a date-time in a wrong format 1', function () {
            assert(formats['date-time']('2013-W06-5T09:30:26 Z').length > 0);
        });
    });

    describe('email', function () {
        it('is defined', function () {
            assert.strictEqual(typeof formats.email, 'function');
        });

        it('validates positively', function () {
            assert.strictEqual(formats.email('ivan.krechetov+special-tag@gmail.com'), null);
        });

        it('validates negatively', function () {
            assert(formats.email('#not_an_email').length > 0);
        });
    });

    describe('uri', function () {
        it('is defined', function () {
            assert.strictEqual(typeof formats.uri, 'function');
        });

        it('validates positively', function () {
            assert.strictEqual(formats.uri('http://krechetov.net/'), null);
        });

        it('validates negatively', function () {
            assert(formats.uri('+41 43 000 00 00').length > 0);
        });
    });

    describe('credit-card-number', function () {
        it('is defined', function () {
            assert.strictEqual(typeof formats['credit-card-number'], 'function');
        });

        it('validates positively', function () {
            assert.strictEqual(formats['credit-card-number']('4242424242424242'), null);
        });

        it('validates negatively on garbage', function () {
            assert(formats['credit-card-number']('MA CC NUM').length > 0);
        });

        it('validates negatively on a number violating the checksum', function () {
            assert(formats['credit-card-number']('1000000000000000').length > 0);
        });
    });
});
