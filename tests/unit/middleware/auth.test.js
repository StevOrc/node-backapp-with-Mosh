const { User } = require('../../../model/users');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    it('should populate the req.user with the payload of a valid token', () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: false
        };

        const token = new User().generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {};
        const next = jest.fn();
        auth(req, res, next);

        expect(req.user).toHaveProperty('_id');
        expect(req.user).toHaveProperty('isAdmin', false);
    })
})