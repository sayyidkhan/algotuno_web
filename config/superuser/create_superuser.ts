// @ts-ignore
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}


const main = async () => {
    //1. ask for the url
    let url = "http://localhost:3000"
    const url_input = await question(
        'Which url endpoint u would like to use for the creation of superuser? \n' +
        'leave it blank if u want to use the default(localhost:3000) :'
    );
    url = url_input === "" ? url : String(url_input);
    console.log(`url : ${url} selected.`);

    //1. ask for the email
    let email;
    let email_status = true;
    while (email_status) {
        email = await question('Please enter an email:\n ');
        await axios(`${url}/api/user/register_superuser?username=${email}`).then(res => {
            if (res.data !== undefined) {
                if (res.data.message.toLowerCase().includes("not exist")) {
                    email_status = false;
                }
                else {
                    console.log(res.data.message);
                    email_status = true;
                }
            }
            else {
                console.log("ERROR entering email.");
            }
        })
            .catch((err) => {
                console.log("ERROR entering email.");
                email_status = true;
            });
    }

    //2. ask for the username
    let username;
    let username_status = true;
    while (username_status) {
        username = await question('Please enter a username:\n ');
        await axios(`${url}/api/user/register_superuser?username=${username}`).then(res => {
            if (res.data !== undefined) {
                if (res.data.message.toLowerCase().includes("not exist")) {
                    username_status = false;
                }
                else {
                    console.log(res.data.message);
                    username_status = true;
                }
            }
            else {
                console.log("ERROR entering username.");
            }
        })
            .catch((err) => {
                console.log("ERROR entering username.");
                username_status = true;
            });
    }


    //3. ask for the password
    const password = await question('Please enter a password:\n ');

    //4. create the account
    console.log("result: ", {
        "username": username,
        "password": password,
        "email": email,
    });
    rl.close()
}

main()

module.exports = {}
