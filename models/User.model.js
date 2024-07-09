const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(name, phone, city, street, country, postalCode, email, password) {
        this._name = name;
        this._phone = phone;
        this._city = city;
        this._street = street;
        this._country = country;
        this._postalCode = postalCode;
        this._email = email;
        this._password = password;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    get street() {
        return this._street;
    }

    set street(value) {
        this._street = value;
    }

    get country() {
        return this._country;
    }

    set country(value) {
        this._country = value;
    }

    get postalCode() {
        return this._postalCode;
    }

    set postalCode(value) {
        this._postalCode = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    async signup() {
        try {
            const hashedPassword = await bcrypt.hash(this._password, 12);
            const newUser = {
                name: this._name,
                phone: this._phone,
                city: this._city,
                street: this._street,
                country: this._country,
                postalCode: this._postalCode,
                email: this._email,
                password: hashedPassword
            };
            return await db.getDb().collection('users').insertOne(newUser);
        } catch (error) {
            console.error('Error during user signup:', error);
            throw error;
        }
    }

    static async login(user) {
        try {
            const dbUser = await db.getDb().collection('users').findOne({ email: user._email });
            if (!dbUser) {
                return false;
            }

            const passwordMatches = await User.hasSamePassword(user._password, dbUser.password);
            if (passwordMatches) {
                return dbUser;
            }
            return false;
        } catch (error) {
            console.error('Error during user login:', error);
            throw error;
        }
    }

    static async hasSamePassword(inputPassword, dbPassword) {
        return await bcrypt.compare(inputPassword, dbPassword);
    }
}

module.exports = User;