const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {

    constructor(email, password, name, phone, city, street, country, postalCode , profilePicPath) {
        this.name = name;
        this.phone = phone;
        this.city = city;
        this.street = street;
        this.country = country;
        this.postalCode = postalCode;
        this.email = email;
        this.password = password;
        this.profilePicPath = profilePicPath || 'default.png';
        this.isAdmin = false;
    }


    static async login(user) {
        try {
            const dbUser = await db.getDb().collection('users').findOne({ email:user.email });
            if (!dbUser) {
                throw new Error('User not found');
            }

            const passwordMatches = await User.hasSamePassword(user.password, dbUser.password);
            if (passwordMatches) {
                console.log('password matched')
                return dbUser;
            }
            throw new Error('Invalid password');
        } catch (error) {
            console.error('Error during user login:', error);
            throw error;
        }
    }

    static async hasSamePassword(inputPassword, dbPassword) {
        return bcrypt.compare(inputPassword, dbPassword);
    }

    static async getUser(email) {
        try {
            return await db.getDb().collection('users').findOne({ email });
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async signup() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            const newUser = {
                name: this.name,
                phone: this.phone,
                city: this.city,
                street: this.street,
                country: this.country,
                postalCode: this.postalCode,
                email: this.email,
                password: hashedPassword,
                profilePicPath: this.profilePicPath,
                isAdmin: this.isAdmin
            };
            const result = await db.getDb().collection('users').insertOne(newUser);
            return result;
        } catch (error) {
            console.error('Error during user signup:', error);
            throw error;
        }
    }

    static async getAllUsers(){
        try {
            return await db.getDb().collection('users').find().toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async findByIdAndUpdate(userId, updatedData) {
        try {
          const updateResult = await db.getDb().collection('users').updateOne(
            { _id: new db.ObjectId(userId) },
            { $set: updatedData }
          );
    
          if (updateResult.modifiedCount === 0) {
            throw new Error('User not found or no changes made');
          }
    
          const updatedUser = await db.getDb().collection('users').findOne({ _id: new db.ObjectId(userId) });
          return updatedUser;
        } catch (error) {
          console.error('Error updating user by ID:', error);
          throw error;
        }
      }

    async updateUser(email){
        try {
            const updatedUser = {
                name: this.name,
                phone: this.phone,
                city: this.city,
                street: this.street,
                country: this.country,
                postalCode: this.postalCode,
                profilePicPath: this.profilePicPath,
                isAdmin: this.isAdmin
            };
            const result = await db.getDb().collection('users').updateOne({email: email}, {$set: {
                name: updatedUser.name,
                phone: updatedUser.phone,
                city: updatedUser.city,
                street: updatedUser.street,
                country: updatedUser.country,
                postalCode: updatedUser.postalCode,
                profilePicPath: updatedUser.profilePicPath
            }});
            return result;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}

module.exports = User;