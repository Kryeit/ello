import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Define your routes
const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/login', changefreq: 'monthly', priority: 0.8 },
    { url: '/home', changefreq: 'daily', priority: 0.9 },
    { url: '/bans', changefreq: 'monthly', priority: 0.7 },
    { url: '/@:playerName', changefreq: 'weekly', priority: 0.8 },
    { url: '/leaderboard', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/modpacks', changefreq: 'monthly', priority: 0.6 },
    { url: '/launchers', changefreq: 'monthly', priority: 0.6 },
    { url: '/legacy-gallery', changefreq: 'monthly', priority: 0.6 },
    { url: '/branding', changefreq: 'monthly', priority: 0.6 },
    { url: '/merch', changefreq: 'monthly', priority: 0.6 },
    { url: '/product/:name', changefreq: 'weekly', priority: 0.7 },
    { url: '/getting-started', changefreq: 'monthly', priority: 0.6 },
];

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://kryeit.com' });

// Write the sitemap to a file
const writeStream = createWriteStream(resolve('public', 'sitemap.xml'));
sitemap.pipe(writeStream);

// Add routes to the sitemap
routes.forEach(route => sitemap.write(route));

// End the sitemap stream
sitemap.end();

// Wait for the stream to finish and log the result
streamToPromise(sitemap).then(data => {
    console.log('Sitemap generated successfully');
}).catch(err => {
    console.error('Error generating sitemap:', err);
});