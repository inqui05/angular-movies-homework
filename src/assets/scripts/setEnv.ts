/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// @ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const { environment } = argv;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, (err) => {
    if (err) console.log(err);
    if (environmentFileContent !== '') console.log(`wrote variables to ${targetPath}`);
  });
}

const envDirectory = './src/environments';
if (!existsSync(envDirectory)) mkdirSync(envDirectory);

writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

const isProduction = environment === 'prod';
const targetPath = isProduction ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';
const environmentFileContent = `export const environment = {
    production: ${isProduction},
    moviesDatabaseKey: '${process.env.moviesDatabaseKey}',
  }`;

writeFileUsingFS(targetPath, environmentFileContent);
