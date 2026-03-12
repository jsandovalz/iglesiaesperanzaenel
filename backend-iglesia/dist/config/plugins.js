"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({});
//export default config;
exports.default = {
    email: {
        config: {
            provider: 'strapi-provider-email-nodemailer',
            providerOptions: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'jsandovalz@gmail.com',
                    pass: 'Ant_2025!',
                },
                // Opcional: TLS
                secure: false,
                tls: {
                    rejectUnauthorized: false,
                },
            },
            settings: {
                defaultFrom: 'jsandovalz@gmail.com',
                defaultReplyTo: 'jsandovalz@gmail.com',
            },
        },
    },
};
