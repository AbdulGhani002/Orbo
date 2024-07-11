const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {
    #name;
    #phone;
    #city;
    #street;
    #country;
    #postalCode;
    #email;
    #password;

    constructor(email, password, name, phone, city, street, country, postalCode) {
        this.#name = name;
        this.#phone = phone;
        this.#city = city;
        this.#street = street;
        this.#country = country;
        this.#postalCode = postalCode;
        this.#email = email;
        this.#password = password;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        this.#phone = value;
    }

    get city() {
        return this.#city;
    }

    set city(value) {
        this.#city = value;
    }

    get street() {
        return this.#street;
    }

    set street(value) {
        this.#street = value;
    }

    get country() {
        return this.#country;
    }

    set country(value) {
        this.#country = value;
    }

    get postalCode() {
        return this.#postalCode;
    }

    set postalCode(value) {
        this.#postalCode = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        this.#password = value;
    }

    static async login(email, password) {
        try {
            const dbUser = await db.getDb().collection('users').findOne({ email });
            if (!dbUser) {
                throw new Error('User not found');
            }

            const passwordMatches = await User.hasSamePassword(password, dbUser.password);
            if (passwordMatches) {
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
            const hashedPassword = await bcrypt.hash(this.#password, 12);
            const newUser = {
                name: this.#name,
                phone: this.#phone,
                city: this.#city,
                street: this.#street,
                country: this.#country,
                postalCode: this.#postalCode,
                email: this.#email,
                password: hashedPassword
            };
            const result = await db.getDb().collection('users').insertOne(newUser);
            return result;
        } catch (error) {
            console.error('Error during user signup:', error);
            throw error;
        }
    }
}

module.exports = User;