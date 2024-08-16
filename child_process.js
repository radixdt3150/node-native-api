const { spawn, exec } = require('node:child_process');
// Async in nature
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });

// Synchronous in nature
/* exec('ls -lh /usr', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }

    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
}) */

// Example: A very elaborate way to run ps ax | grep ssh
const ps = spawn('ps', ['ax']) // list all the processes
const grep = spawn('grep', ['ssh']);

// Pipe the output of ps to grep
ps.stdout.on('data', (data) => {
    grep.stdin.write(data);
});

ps.stderr.on('data', (err) => {
    console.error(`PS STDERR: ${err}`)
})

// Close grep stdin when ps closes
ps.on('close', (code) => {
    if (code !== 0) {
        console.error(`Process exited with code: ${code}`)
    }

    grep.stdin.end();
});

// Check for data on grep stdout
grep.stdout.on('data', (data) => {
    console.log(data.toString())
})

// Check for errors
grep.stderr.on('data', (err) => {
    console.error(`GREP STDERR: ${err}`)
})