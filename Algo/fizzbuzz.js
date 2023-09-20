function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let output = "";
    
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    
    console.log(output || i);
  }
}

const N = 100;
fizzBuzz(N);
