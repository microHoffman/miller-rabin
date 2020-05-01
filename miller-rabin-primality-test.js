// Explanation of the algorithm can be found here:
// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test

const millerRabinPrimeTest = (number) => {
    number = BigInt(number);

    // You can adjust the reliability, although 40 should be enough
    const reliability = 40;

    // Algorithm starting from the 3
    if( (number === 2n ) || ( number === 3n )) {
        return true;
    }

    if( (number < 2n) || ( (number % 2n) === 0 )) {
        return false;
    }

    // Decompose the number
    let s = 0n, d = number - 1n;
	while (d & 1n) {
		d /= 2n;
		s++;
	}

    for(let i = 0; i < reliability; i++ ) {
        let startNewLoop = false;
        const a = BigInt(getRandomInt(Number(number) - 1));
        let x = BigInt( (a ** d) % number );

        if( (x === 1n) || (x === (number - 1n)) ) {
            continue;
        }

        for(let r = 1; r < s; r++) {
            x = (x ** 2n) % number;
            if(x === 1n) {
                return false;
            } else if ( x === (number - 1n) ) {
                startNewLoop = true;
                break;
            }
        }

        if(startNewLoop === false) {
            return false;
        }
    }
    return true;
}

const getRandomInt = number => Math.floor(Math.random() * Math.floor(number)) + 1;

const displayResult = (number, event) => {
    event.preventDefault();
    document.getElementById("result").innerHTML = `Number ${number} is ${millerRabinPrimeTest(number) ? "" : "<strong>not</strong>"} a prime.`;
}