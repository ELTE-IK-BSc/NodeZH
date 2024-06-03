const CryptoJS = require('crypto-js')
const axios = require('axios')
const path = require('path')
const chalk = require('chalk')
const { readFile, writeFile } = require('fs/promises')

;(async () => {
    axios.defaults.baseURL = 'http://webprogramozas.inf.elte.hu:4444/';
    const testerCode = await readFile(path.join(__dirname, 'tester.js'), { encoding: 'utf-8' })
    const checksum = CryptoJS.SHA512(testerCode).toString()
    console.log(chalk.blue(' Tesztelő frissítések keresése...'))
    try {
        const resp = await axios({
            method: 'get',
            url: '/tester',
            params: { checksum },
            timeout: 5000
        })
        if (resp.status === 201){
            console.log(chalk.redBright(' A tesztelőhöz elérhető frissítés, letöltés folyamatban...'))
            const decodedCode = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(resp.data))
            await writeFile(path.join(__dirname, 'tester.js'), decodedCode, { encoding: 'utf-8' })
        }
        console.log(chalk.green(' A tesztelő naprakész! Indulhat a tesztelés...'))
    } catch (err) {
        console.log(chalk.redBright(` A tesztelő frissítése sikertelen! Hiba: ${err}`))
        console.log(chalk.yellowBright(' A tesztelés megkezdődik a meglévő verzióval...'))
    }
    console.log()
})()
