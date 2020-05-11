'use strict';

const mongoose = require('mongoose')

class Mongodb {
    constructor(url, options) {
        this.url = url
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            ...options
        }
    }

    async connect() {
        mongoose.connection.on('connected', () => {
            console.log(`mongo connected to ${this.url}`);
        })
        mongoose.connection.on('error', (err) => {
            console.log('mongoose error:', err);
        })

        mongoose.connection.on('disconnected', () => {
            console.log('mongoose disconnected');
        })

        mongoose.connection.on('reconnected', () => {
            console.log('mongoose reconnected!');
        })

        mongoose.connection.on('reconnectFailed', () => {
            console.log('mongoose reconnectFailed!');
        })
        await mongoose.connect(this.url, this.options)
    }

    static async init(url, options) {
        const mongoClient = new Mongodb(url, options)
        return mongoClient.connect();
    }
}

module.exports = Mongodb