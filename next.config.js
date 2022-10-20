/** @type {import('next').NextConfig} */
require('dotenv').config();
// const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN,
  },
  images: {
    domains: ['13.112.214.174'],
  },
};

module.exports = nextConfig;
