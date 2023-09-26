import userModel from '../models/userModel';

interface userAccount {
    email: string;
    password: string;
}
class Crud {
    public async get(user: userAccount) {
        return userModel.findOne(user)
    }
    public async post(user: userAccount) {
        return userModel.create(user)
    }
    public async put(user: userAccount, newUser: userAccount) {
        return userModel.findOneAndUpdate(user, newUser, {returnDocument: 'after'})
    }
    public async delete(user: userAccount) {
        return userModel.deleteOne(user)
    }
}

export default Crud