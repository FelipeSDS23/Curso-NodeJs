if(process.argv) {
    for(let i = 2; i < process.argv.length; i++) {
        console.log(process.argv[i].split("=")[1]);
    }
}